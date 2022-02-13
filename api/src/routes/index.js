const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const dogList = await apiInfo.data.map(e => {
    return {
      id: e.id,
      name: e.name,
      height: e.height.metric,
      weight: e.weight.metric,
      lifeSpan: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
    }
  })
  return dogList;
};

const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAll = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = dbInfo.concat(apiInfo);
  return totalInfo;
};

// Busca razas por query o por la misma SearchBar
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const dogsTotal = await getAll();
  if (name) {
    let dogName = await dogsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName//.length // SI SACO EL .length, al buscar una raza incorrecta, renderiza un espacio vacio!
      ? res.status(200).json(dogName)
      : res.status(404).send(/*"This breed doesn't exist"*/);
  } else {
    res.status(200).json(dogsTotal);
  }
});

// Busca recetas por ID
router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const allDog = await getAll();
  if (id) {
    let dogId = await allDog.filter((r) => r.id == id);
    dogId.length
      ? res.status(200).json(dogId)
      : res.status(404).send("Breed ID not found");
  }
});

// Busca los temperamentos
router.get("/temperaments", async (req, res) => {
  let temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  let tempMap = temperamentApi.data.map(e => e.temperament).toString(); //mapeo toda la data de temperamentos
  tempMap = await tempMap.split(', '); // separo los string con ,
  const tempSpace = await tempMap.map(e => {
    if (e[0] == ' ') {
      return e.split('')
    }
    return e;
  })
  const tempNotSpace = await tempSpace.map(e => { //vuelvo a mapear 
    if (Array.isArray(e)) {
      e.shift();
      return e.join('')
    }
    return e;
  })
  await tempNotSpace.forEach(e => {
    if (e != '') {
      Temperament.findOrCreate({
        where: {
          name: e
        },
      })
    }
  })
  const allTemps = await Temperament.findAll();
  res.status(200).send(allTemps)
});

// router.get("/dogs/filter/:filterTemp", async (req, res) => {
//   const { filterTemp } = req.params;
//   try {
//     const tempFilter = await Temperament.findAll({
//       where: {
//         name: filterTemp
//       }
//     })
//     return res.json(tempFilter)
//   } catch (error) {
//   }
// })

// Crea una nueva raza en la base de datos
router.post("/dog", async (req, res) => {
  let {
    name,
    height,
    weight,
    lifeSpan,
    image,
    temperaments,
    createdInDb
  } = req.body;
  if (!name || !weight) {
    return res.json("Name and weight of the breed must be filled to continue!");
  }
  let newDog = await Dog.create({
    name,
    height,
    weight,
    lifeSpan,
    image,
    temperaments,
    createdInDb
  });
  let temperamentDB = await Temperament.findAll({
    where: { name: temperaments }
  });
  newDog.addTemperament(temperamentDB)
  res.send("New dog created!");
});

router.delete("/dogs/delete/:id", (req, res, next) => {
  const {id} = req.params;
  Dog.destroy({
    where: {
      id: id
    }
  }).then((data) => {
    return res.json(data ? "Dog deleted" : "Couldn't delete any dog")
  })
  .catch((e) => {
    // return res.send(e).sendStatus(404)
    next(e)
  })
})

module.exports = router;
