import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4} from "uuid";

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid

// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const defaultFormFields = {
  id: null,
  name: '',
  description: '',
  element: '',
};

const HeroesAddForm = () => {
  const [formData, setFormData] = useState(defaultFormFields);
  const { name, description } = formData;
  const { heroes } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdId = uuidv4();
    const newId = {...formData}

    // setFormData(formData => ({...formData, ...newId}))

    // console.log('new hero is created');
    console.log(formData);
    const tempHeroes = [...heroes];
    tempHeroes.push(formData);
    console.log(newId);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    // console.log('someHelp');
    // console.log(formData);
  }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description"
                    className="form-control" 
                    id="text"
                    value={description}
                    onChange={handleChange}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    onChange={handleChange}
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;