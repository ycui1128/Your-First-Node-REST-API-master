const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getALl
// router.get('/', async (req, res) => {
//   try {
//     console.log('=Subscriber=' + Subscriber)
//     const subscribers = await Subscriber.find()
//     res.json(subscribers)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//getOne
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

//create one
// router.post('/', async (req, res) => {
//   console.log(req.body.name)
//   console.log(req.body.subscribedToChannel)

//   const subscriber = new Subscriber({
//     name: req.body.name,
//     subscribedToChannel: req.body.subscribedToChannel,
//   })
//   try {
//     const newSubscriber = await subscriber.save()
//     res.status(201).json(newSubscriber)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.deleteOne()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// router.patch('/:id', getSubscriber, async (req, res) => {
//   try {
//     if (req.body.name != null) {
//       res.subscriber.name = req.body.name
//     }
//     if (req.body.subscribedToChannel != null) {
//       res.subscriber.subscribedToChannel = req.body.subscribedToChannel
//     }

//     console.log(res.subscribe)
//     const updatedSubscriber = await res.subscriber.save()
//     res.json(updatedSubscriber)
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })
router.patch('/:id', getSubscriber, async (req, res) => {
  try {
    console.log('update')
    if (req.body.name != null) {
      console.log(req.body.name)
      res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
async function getSubscriber(req, res, next) {
  let subscriber
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.subscriber = subscriber
  next()
}
module.exports = router
