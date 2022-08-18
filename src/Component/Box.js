import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function Box() {

    const [nameState, setName] = useState('');
    const [emailState, setEmail] = useState('');
    const [show, setShow] = useState('none');

    const [obj,setObj] = useState([
        {
            key: 0,
            name: 'test1',
            email: 'linhak88@gmail.com'
        },
        {
            key: 1,
            name: 'test2',
            email: 'linhak89@gmail.com'
        },
        {
            key: 2,
            name: 'test3',
            email: 'linhak80@gmail.com'
        },
        {
            key: 3,
            name: 'test4',
            email: 'linhak83@gmail.com'
        },
        {
            key: 4,
            name: 'test5',
            email: 'emailpoubelle889@gmail.com'
        },
        {
            key: 5,
            name: 'theo',
            email: 'theoracher.raulin@gmail.com'
        },
    ]);

    const styleError = {
        color: "red",
        display: show
    }

    const handleClick = () => {
        setShow('none');
        const n = document.getElementById('inputName').value;
        const e = document.getElementById('inputEmail').value;

        const emailRegex = /^\S+@\S+\.\S+$/;
        if(emailRegex.test(e)){
            setObj(current => [...current, {key:obj.length,name:n, email:e}]);
            
            console.log(obj);
            setName('');
            setEmail('');
        }
        else{
            setShow('block');
        };
    };


    const removeItem = (key) => {
        setObj(current =>
          current.filter(item => {
            return item.key !== key;
          }),
        );
      };

    const randomNumber = (max) => {
        return Math.floor(Math.random() * max);
    }

    const sendEmails = () => {

        let outArray = [];
        obj.map(({key}) => {
            return outArray.push(key);
        });

        const size = outArray.length;        
        let inArray = outArray;

        for (let i = 0; i < size; i++) {
            const max = outArray.length;
            let idOut = outArray[randomNumber(max)];
            let idIn = inArray[randomNumber(max)];
            
            while(idOut === idIn){
                idIn = inArray[randomNumber(max)]
            };

            
            outArray = outArray.filter(id => id !== idOut);
            inArray = inArray.filter(id => id !== idIn);

            emailjs.send("service_1oy3sqm","template_nyw2hg4",{
                name: obj[Object.keys(obj)[idOut]].name,
                name_to: obj[Object.keys(obj)[idIn]].name,
                email: obj[Object.keys(obj)[idOut]].email,
            },"Bd8wRPWYhLfayduNg");

            
            // console.log(idOut + " et " + idIn);
            
        }

    };

    return (
        <>
            <div>
                <input id={'inputName'}  type='text'  placeholder='nom'   onChange={(e) => setName(e.target.value)}  value={nameState} required/>
                <input id={'inputEmail'} type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} value={emailState} required/>
                <button onClick={handleClick}>Send</button>
            </div>
            <div style={styleError}>Le format du mail n'est pas correct</div>
            {
                obj.map(({key, name, email}) => 
                    <div id={key} key={key}>
                        - Nom: {name} et email: {email}
                        <button onClick={() => removeItem(key)}>Delete</button>
                    </div>
                )
            }
            <button onClick={sendEmails}>Send all</button>
        </>
    );
}

export default Box;