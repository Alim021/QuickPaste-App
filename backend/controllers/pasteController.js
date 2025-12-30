const Paste = require('../models/Paste');
const { nanoid } = require('nanoid');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.health = (req, res) => {
  res.json({ ok: true });
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.createPaste = async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === '') {
    return res.status(400).json({ error: 'Content required' });
  }

  // Use simple ID without special characters
  const id = nanoid(10).replace(/[\/\\]/g, '-'); // Replace slashes with dashes
  
  try {
    const paste = new Paste({ 
      _id: id, 
      content: content.trim(),
      views: 0 
    });
    await paste.save();

    // Return BOTH the ID and full URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.json({
      id: id,
      url: `${frontendUrl}/paste/${id}`,
      message: 'Paste created successfully'
    });
  } catch (err) {
    console.error('Error creating paste:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getPaste = async (req, res) => {
  const { id } = req.params;
  
  console.log('Fetching paste with ID:', id); // Debug log
  
  try {
    const paste = await Paste.findById(id);
    
    if (!paste) {
      console.log('Paste not found for ID:', id);
      return res.status(404).json({ 
        error: 'Paste not found',
        id: id
      });
    }

    paste.views += 1;
    await paste.save();

    res.json({
      id: paste._id,
      content: paste.content,
      views: paste.views,
      created_at: paste.createdAt,
      expires_at: null
    });
  } catch (err) {
    console.error('Error fetching paste:', err);
    res.status(500).json({ error: 'Server error' });
  }
};