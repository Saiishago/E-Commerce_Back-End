const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
try {
  const tagData = await Tag.findAll({
    include: [{model: Product}],
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json({message: 'could not find Tags!'});
}
});

router.get('/:id', async (req, res) => {
try {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{model: Product}],
  });
  if (!tagData){
    res.status(404).json({message: 'No tag matching this id has been found!'});
    return;
  }
  res.status(200).json(tagData);
} catch (err){
  res.status(500).json({message: 'could not find Tag'});
}
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({message: 'could not create Tag!'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: {id: req.params.id},
    });
    !updated[0]
    ?res.status(404).json({message: 'no tag matching id found'})
    :res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({message: 'failed to update Tag!'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tag.destroy({where: {id: req.params.id}});
    !deleted
    ?res.status(404).json({message: 'no tag matching id'})
    :res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({message: 'could not delete tag!'});
  }
});

module.exports = router;
