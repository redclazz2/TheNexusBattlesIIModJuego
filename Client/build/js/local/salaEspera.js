const cargarStadisticas = () => {

    
    
    const idheroe = '65035fb3cd1283c97b876f9d';

    fetch(`https://cards.thenexusbattles2.cloud/api/heroes/${idheroe}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Obtener elementos HTML por ID
            const clase = document.getElementById('clase_heroe');
            const poder = document.getElementById('poder_heroe');
            const vida = document.getElementById('vida_heroe');
            const defensa = document.getElementById('defensa_heroe');
            const ataqueDado = document.getElementById('ataque_dado_heroe');
            const daño = document.getElementById('daño_heroe');
            // Asignar las proiedades correspondientes a los elementos con texto adicional
            clase.innerText = ` ${data.Clase}`;
            poder.innerText = `Poder: ${data.Poder}`;
            vida.innerText = `Vida: ${data.Vida}`;
            defensa.innerText = `Defensa: ${data.Defensa}`;
            ataqueDado.innerText = `Ataque Dado: ${data.AtaqueDado}`;
            daño.innerText = `Daño: ${data.DanoMax}`;
        })
        .catch(error => {
            // Manejar errores aquí
            console.error('Error en la solicitud fetch:', error);
        });
        const idheroe2 = '650362c4cd1283c97b876fc9';
        fetch(`https://cards.thenexusbattles2.cloud/api/heroes/${idheroe2}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Obtener elementos HTML por ID
            const clase2 = document.getElementById('clase_heroe2');
            const poder2 = document.getElementById('poder_heroe2');
            const vida2 = document.getElementById('vida_heroe2');
            const defensa2 = document.getElementById('defensa_heroe2');
            const ataqueDado2 = document.getElementById('ataque_dado_heroe2');
            const daño2 = document.getElementById('daño_heroe2');
            // Asignar las proiedades correspondientes a los elementos con texto adicional
            clase2.innerText = ` ${data.Clase}`;
            poder2.innerText = `Poder: ${data.Poder}`;
            vida2.innerText = `Vida: ${data.Vida}`;
            defensa2.innerText = `Defensa: ${data.Defensa}`;
            ataqueDado2.innerText = `Ataque Dado: ${data.AtaqueDado}`;
            daño2.innerText = `Daño: ${data.DanoMax}`;
        })
        .catch(error => {
            // Manejar errores aquí
            console.error('Error en la solicitud fetch:', error);
        });
        const idheroe3 = '650360f8cd1283c97b876fa9';

        fetch(`https://cards.thenexusbattles2.cloud/api/heroes/${idheroe3}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const clase3 = document.getElementById('clase_heroe3');
            const poder3 = document.getElementById('poder_heroe3');
            const vida3 = document.getElementById('vida_heroe3');
            const defensa3 = document.getElementById('defensa_heroe3');
            const ataqueDado3 = document.getElementById('ataque_dado_heroe3');
            const daño3 = document.getElementById('daño_heroe3');
            clase3.innerText = ` ${data.Clase}`;
            poder3.innerText = `Poder: ${data.Poder}`;
            vida3.innerText = `Vida: ${data.Vida}`;
            defensa3.innerText = `Defensa: ${data.Defensa}`;
            ataqueDado3.innerText = `Ataque Dado: ${data.AtaqueDado}`;
            daño3.innerText = `Daño: ${data.DanoMax}`;
        })
        .catch(error => {
            console.error('Error en la solicitud fetch:', error);
        });
        const idheroe4 = '65036184cd1283c97b876fb4';
        fetch(`https://cards.thenexusbattles2.cloud/api/heroes/${idheroe4}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Obtener elementos HTML por ID
            const clase4 = document.getElementById('clase_heroe4');
            const poder4 = document.getElementById('poder_heroe4');
            const vida4= document.getElementById('vida_heroe4');
            const defensa4 = document.getElementById('defensa_heroe4');
            const ataqueDado4 = document.getElementById('ataque_dado_heroe4');
            const daño4 = document.getElementById('daño_heroe4');
            // Asignar las proiedades correspondientes a los elementos con texto adicional
            clase4.innerText = ` ${data.Clase}`;
            poder4.innerText = `Poder: ${data.Poder}`;
            vida4.innerText = `Vida: ${data.Vida}`;
            defensa4.innerText = `Defensa: ${data.Defensa}`;
            ataqueDado4.innerText = `Ataque Dado: ${data.AtaqueDado}`;
            daño4.innerText = `Daño: ${data.DanoMax}`;
        })
        .catch(error => {
            
            console.error('Error en la solicitud fetch:', error);
        });
};

const btnTest = document.getElementById('btnTest').addEventListener('click', cargarStadisticas)