import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postActivities, getActivities } from "../../02_actions";
import { INVIERNO, VERANO, OTOÑO, PRIMAVERA } from "../../04_const/Const";
import NavBar from "../NavBar/NavBar";
import "./ActivityCreate.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Debe completar este campo";
  } else if (!input.duration) {
    errors.duration = "Debe completar este campo";
  } else if (!input.difficulty) {
    errors.difficulty = "Debe seleccionar la complejidad";
  } else if (!input.season) {
    errors.season = "Debe seleccionar una estacion";
  } else if (input.countries === []) {
    errors.countries = "Debe seleccionar un pais";
  }
  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.allCountries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    duration: 0,
    difficulty: 0,
    season: "",
    countries: [],
  });

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDelete(i) {
    setInput({
      ...input,
      countries: input.countries.filter((el) => el !== i),
    });
  }

  function handleSelect(e) {
    setInput({ ...input, countries: [...input.countries, e.target.value] });
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    // Validación de campos faltantes
    if (
      input.name.trim() === "" ||
      input.duration.trim() === 0 ||
      input.difficulty === 0 ||
      input.season.trim() === "" ||
      input.countries.length === 0
    ) {
      return alert('Debe llenar todos los campos');
    }
  
    // Validación para no permitir espacios en el comienzo de "name" y "season"
    if (
      input.name !== input.name.trim() ||
      input.season !== input.season.trim() ||
      input.duration !== input.duration.trim()
    ) {
      return alert('Los campos "name","duration" y "season" no pueden empezar con espacios');
    }
  
    const values = {
      ...input,
      duration: Number(input.duration),
      difficulty: Number(input.difficulty)
    };
  
    dispatch(postActivities(values));
    alert("Actividad Creada");
    setInput({
      name: "",
      duration: 0,
      difficulty: 0,
      season: "",
      countries: []
    });
    history.push("/home");
  }
  
  

  return (
    <div className="">
      <div>
        <NavBar />
      </div>

      <div className="activityCardContainer">
        <div className="activityCard">
          <div className="activityTitle">
          </div>  

          <form className="formActivity" onSubmit={handleSubmit}>
            <span className='titleCreateActivity'> Crea una Actividad </span>
            <div className="inputActivities">
              <label className='labelActivity'></label>
              <input
                className="i"
                type="text"
                placeholder="Coloque la Actividad..."
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className="e">{errors.name}</p>}
            </div>
            <div className="inputActivities">
              <label></label>
              <input
                className="i"
                type="text"
                value={input.duration}
                name="duration"
                placeholder="Coloque la Duracion..."
                onChange={handleChange}
              />
              {errors.duration && <p className="e">{errors.duration}</p>}
            </div>
            <div className="inputActivities">
              <label> Dificultad </label>
              <input
                className="i"
                type="range"
                name="difficulty"
                min="1"
                max="5"
                value={input.difficulty}
                onChange={(e) => handleChange(e)}
              />
              {errors.difficulty && <p className="e"> {errors.difficulty}</p>}
            </div>
            <div className="seasonInput">
              <select
                className="i"
                name="season"
                value={input.season}
                onChange={(e) => handleChange(e)}
              >
                <option className='op' > Temporada </option>
                <option className='op' value={INVIERNO}>Invierno</option>
                <option className='op' value={VERANO}>Verano</option>
                <option className='op' value={OTOÑO}>Otoño</option>
                <option className='op' value={PRIMAVERA}>Primavera</option>
              </select>
              {errors.season && <p className="e">{errors.season}</p>}
            </div>
            {errors.countries && <p className="e">{errors.countries}</p>}

            <div>
              <select  className="i" onChange={(e) => handleSelect(e)}>
                <option className='op' > Paises </option>
                {countries.map((v) => (
                  <option className='op' value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="textArea">
              {input.countries.map((country) => (
                <div className='countrieAndButton'>
                  <input className='btnDelete' type='button' value='X' onClick={() => handleDelete(country)}/>
                  <p className='pOfCountry'>{country}</p>
                </div>
              ))}
            </div>
            <div>
              <button className='btnActivity' type="submit">Crear Actividad</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
