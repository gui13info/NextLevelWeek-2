import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm(){
const history = useHistory();

const [name, setName] = useState('');
const [avatar, setAvatar] = useState('');
const [whatsapp, setWhasapp] = useState('');
const [bio, setBio] = useState('');

const [subject, setSubject] = useState('');
const [cost, setCost] = useState('');

const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
]);

function addNewScheduleItem() {
    setScheduleItems([
        ...scheduleItems,
        { week_day: 0, from: '', to: '' }
    ]);
}

function setScheduleItemValue(position: Number, field: string, value: string){
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) =>{
        if (index === position){
            return { ...scheduleItem, [field]: value }
        }

        return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
}

function handleCreateClass(e: FormEvent){
    e.preventDefault();

    api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems
    }).then(() =>{
        alert('Cadastro realizado com sucesso!');

        history.push('/');
    }).catch(() =>{
        alert('Erro no cadastro!')
    })

    // console.log({
    //     name,
    //     avatar,
    //     whatsapp,
    //     bio,
    //     subject,
    //     cost,
    //     scheduleItems
    // });
}

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas" 
                description="O primeiro passa é preencher esse formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} 
                        />

                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }} 
                        />

                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={whatsapp}
                            onChange={(e) => { setWhasapp(e.target.value) }}
                        />
                        
                        <Textarea 
                            name="bio" 
                            label="Biografia" 
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}    
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria" 
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                            ]}
                            />

                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula." 
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}    
                        />
                    </fieldset>
                    
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} 
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-Feira' },
                                            { value: '2', label: 'Terça-Feira' },
                                            { value: '3', label: 'Quarta-Feira' },
                                            { value: '4', label: 'Quinta-Feira' },
                                            { value: '5', label: 'Sexta-Feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />

                                    <Input 
                                        name="from" 
                                        label="Das"
                                        value={scheduleItem.from} 
                                        type="time" 
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até"
                                        value={scheduleItem.to} 
                                        type="time" 
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={ warningIcon } alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados.
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;