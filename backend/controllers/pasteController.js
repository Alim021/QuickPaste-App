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

  const id = nanoid(8);

  try {
    const paste = new Paste({ _id: id, content, views: 0 });
    await paste.save();

    res.json({
      id,
      url: `http://localhost:3000/paste/${id}`,
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
  try {
    const paste = await Paste.findById(req.params.id);
    if (!paste) {
      return res.status(404).json({ error: 'Not found' });
    }

    paste.views++;
    await paste.save();

    res.json({
      content: paste.content,
      remaining_views: null,
      expires_at: null,
    });
  } catch (err) {
    console.error('Error fetching paste:', err);
    res.status(500).json({ error: 'Server error' });
  }
};