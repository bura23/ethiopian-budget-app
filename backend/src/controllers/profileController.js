const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const getProfile = async (req, res) => {
  try {
    const [user] = await pool.query(
      'SELECT id, name, email, photo_url FROM users WHERE id = ?',
      [req.user.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: user[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, req.user.id]
    );

    const [updatedUser] = await pool.query(
      'SELECT id, name, email, photo_url FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({
      success: true,
      user: updatedUser[0]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}).single('photo');

const uploadPhoto = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    try {
      const photoUrl = `/uploads/${req.file.filename}`;
      await pool.query(
        'UPDATE users SET photo_url = ? WHERE id = ?',
        [photoUrl, req.user.id]
      );

      res.json({
        success: true,
        photoUrl
      });
    } catch (error) {
      console.error('Upload photo error:', error);
      res.status(500).json({
        success: false,
        message: 'Error uploading photo'
      });
    }
  });
};

const updatePreferences = async (req, res) => {
  try {
    const { currency } = req.body;

    await pool.query(
      'UPDATE budget_settings SET currency = ? WHERE user_id = ?',
      [currency, req.user.id]
    );

    res.json({
      success: true,
      message: 'Preferences updated successfully'
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating preferences'
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadPhoto,
  updatePreferences
}; 