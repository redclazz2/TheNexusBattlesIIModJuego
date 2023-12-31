import Carta from "./cartaClass.js";
import CartaHeroeInv from "./cartaHeroeClass.js";
import CartaHeroe from "../cartas/CartaHeroe.js";
import CartaConsumible from "../cartas/CartaConsumible.js";

export default class InventarioModel {

  //Este mapa puede tener en lugar de Any una Carta? No estoy
  //Seguro xq una carta heroe tiene atributos distintos a las consumibles!!
  /*
    El mapa del cliente guarda como llave el ID de la carta
    y guarda el json que viene directamente de la API.

    Esto se hace con fines de que funcione para todas las distintas
    clases de cartas que se han generado para cada componente -> Es importante estandarizarlo!
  */
  cardMasterMap: Map<string, any>;

  constructor() {
    this.cardMasterMap = new Map<string, any>();
  }

  async getArmaCard(e: any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/armas/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = card.Nombre;
      _current_card.desc = card.Desc;
      _current_card.coleccion = "Arma";
      _current_card.urlImagen = card.UrlImagen;

      this.addCardToMasterMap(card.Id, card, "Arma");

      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getArmaduraCard(e: any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/armaduras/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = "Armadura " + card.Tipo;
      _current_card.coleccion = "Armadura";
      _current_card.desc = card.Desc;
      _current_card.urlImagen = card.UrlImagen;

      this.addCardToMasterMap(card.Id, card, "Armadura");

      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getItemCard(e: any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/items/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = card.Nombre;
      _current_card.desc = card.Desc;
      _current_card.coleccion = "Item";
      _current_card.urlImagen = card.UrlImagen;

      this.addCardToMasterMap(card.Id, card, "Item");

      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getEpicaCard(e: any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/epicas/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = card.Nombre;
      _current_card.desc = card.Desc;
      _current_card.coleccion = "Epica";
      _current_card.urlImagen = card.UrlImagen;

      this.addCardToMasterMap(card.Id, card, "Epica");

      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getHeroeCard(e: any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/heroes/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new CartaHeroeInv();
      _current_card.ataqueBase = card.AtaqueBase;
      _current_card.ataqueDado = card.AtaqueDado;
      _current_card.clase = card.Clase;
      _current_card.danoMax = card.DanoMax;
      _current_card.defensa = card.Defensa;
      _current_card.desc = card.Desc;
      _current_card.id = card.Id;
      _current_card.poder = card.Poder;
      _current_card.tipo = card.Tipo;
      _current_card.urlImagen = card.UrlImagen;
      _current_card.vida = card.Vida;
      _current_card.coleccion = "Heroe";

      this.addCardToMasterMap(card.Id, card, "Heroe");

      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  // En InventarioModel
  async getUserInventory() {
    const accessToken = localStorage.getItem('access_token');

    if(!accessToken){
      console.error("No se ha encontrado el token de acceso");
      return;
    }

    const _dataSource = "https://store.thenexusbattles2.cloud/webserver/ver-inventario"; // Cambiar esta línea por la API
    
    try {
      const userInventory = await fetch(_dataSource,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${accessToken}`
        }
      });

     // const cartasJSON = await userInventory.json();

      const cartasJSON = [
        {
          "id": 2,
          "user": "Administrador",
          "id_carta": "64e582f509a1f203598f17ed",
          "type": "Arma"
        },
        {
          "id": 3,
          "user": "Administrador",
          "id_carta": "64e582f509a1f203598f17ed",
          "type": "Arma"
        },
        {
          "id": 1,
          "user": "Administrador",
          "id_carta": "64e5830109a1f203598f17f9",
          "type": "Armadura"
        },
        {
          "id": 4,
          "user": "Administrador",
          "id_carta": "64e5830a09a1f203598f17ff",
          "type": "Item"
        },
        {
          "id": 6,
          "user": "Administrador",
          "id_carta": "64eb906091c55d02fe369b27",
          "type": "Epica"
        },
        {
          "id": 7,
          "user": "Administrador",
          "id_carta": "64eb906091c55d02fe369b27",
          "type": "Epica"
        },
        {
          "id": 7,
          "user": "Administrador",
          "id_carta": "64eb906091c55d02fe369b27",
          "type": "Epica"
        },
        {
          "id": 7,
          "user": "Administrador",
          "id_carta": "64eb906091c55d02fe369b27",
          "type": "Epica"
        },
        {
          "id": 7,
          "user": "Administrador",
          "id_carta": "64eb906091c55d02fe369b27",
          "type": "Epica"
        },
        {
          "id": 7,
          "user": "Administrador",
          "id_carta": "64eb906091c55d02fe369b28",
          "type": "Epica"
        },
        {
          "id": 15,
          "user": "Administrador",
          "id_carta": "65035fefcd1283c97b876fa1",
          "type": "Heroe"
        }
      ]

      const cartasPromises = [];

      for (const e of cartasJSON) {
        switch (e.type) {
          case "Arma":
            cartasPromises.push(this.getArmaCard(e));
            break;

          case "Armadura":
            cartasPromises.push(this.getArmaduraCard(e));
            break;

          case "Item":
            cartasPromises.push(this.getItemCard(e));
            break;

          case "Epica":
            cartasPromises.push(this.getEpicaCard(e));
            break;

          case "Heroe":
            cartasPromises.push(this.getHeroeCard(e));
            break;
        }
      }

      const cartas = await Promise.all(cartasPromises);
      return cartas;
    } catch (error) {
      throw error;
    }
  }

  /*
     Este método registra cartas en el mapa maestro. Como es un mapa
     se puede verificar con el ID si la carta ya está registrada.

     El mapa guarda:
     {llave,[data_api,tipo_carta]}
  */
  addCardToMasterMap = (card_id: string, card_api_data: any, card_type: string) => {
    //Verifica que no exista la carta no esté registrada
    if (!this.cardMasterMap.has(card_id)) {
      this.cardMasterMap.set(card_id, [card_api_data, card_type]);
    }
  }

  //Este método retorna el mapa de cartas maestro entero
  getMasterMap = (): Map<string, any> => {
    return this.cardMasterMap;
  }

  //Cambiar el tipo any x lo q retorne la API (string?)
  /*
     Este método permite obtener la data de la carta guardado en el
     mapa maestro.
  */
  getCardFromMasterMap = (card_id: string): any => {
    if (this.cardMasterMap.has(card_id)) return this.cardMasterMap.get(card_id);
    else return "";
  }


  //Auto completado del mazo, perdón x el any en el localfinalcards pero
  //No estoy segurodel tipo q tenga la carta dentro! 

  /*
    Esta función autocompleta la selección del usuario y pasa las cartas
    de un modelo de vista inventario al modelo de datos utilizado en el juego.

    Se le pasa una array de los IDs de las cartas seleccionadas en la vista.
  */
  autoCompletePlayerSelection = (player_selection: Array<string>) => {
    let local_final_cards: Array<any> = [];
    let all_armas:number = 0;
    let all_armaduras:number = 0;
    let all_items:number = 0;
    let all_epicas:number = 0;
    let all_epicas_hero:number = 0;
    let my_hero_type:string = "";

    //forma temporal de encontrar primero al heroe
    for (let key of player_selection) {
      let current_card = this.getCardFromMasterMap(key);
      if (current_card[1] == "Heroe"){
        my_hero_type = current_card[0].Clase + " " + current_card[0].Tipo;

        let hero:CartaHeroe = {} as CartaHeroe;

        hero.urlImagen = current_card[0].UrlImagen;
        hero.nombre = current_card[0].Clase + " " + current_card[0].Tipo;
        hero.poder = current_card[0].Poder;
        hero.vida = current_card[0].Vida;
        hero.vidaActual = current_card[0].Vida;
        hero.defensa = current_card[0].Defensa;
        hero.ataque_base = current_card[0].AtaqueBase;
        hero.ataque_maximo = current_card[0].AtaqueDado;
        hero.daño_maximo = current_card[0].DanoMax;
        hero.descripcion = current_card[0].Desc;
        hero.coleccion = current_card[1];

        local_final_cards.push(hero);

        player_selection.slice(player_selection.indexOf(key),1);
        break;
      }
    }

    for (let current_card_id of player_selection) {
      //En el mapa se guarda [api,tipo_arma]
      let current_card_api_data = this.getCardFromMasterMap(current_card_id);

      //Verifica x el tipo de arma cómo la va a completar
      switch (current_card_api_data[1]) {
        case "Arma":
          if (this.autoCompleteCardDuplicationHelper(all_armas, 8, 4, local_final_cards, current_card_api_data)) all_armas+=4;
          break;
        case "Armadura":
          if (this.autoCompleteCardDuplicationHelper(all_armaduras, 4, 4, local_final_cards, current_card_api_data)) all_armaduras+=4;
          break;
        case "Item":
          if (this.autoCompleteCardDuplicationHelper(all_items, 4, 4, local_final_cards, current_card_api_data)) all_items+=4;
          break;
        case "Epica":
          if(my_hero_type == current_card_api_data[0].Heroe){
            if (this.autoCompleteCardDuplicationHelper(all_epicas_hero, 4, 4, local_final_cards, current_card_api_data)) all_epicas_hero+=4;
          }else{
            if (this.autoCompleteCardDuplicationHelper(all_epicas, 10, 2, local_final_cards, current_card_api_data)) all_epicas+=2;
          }
          break;
      }
    }

    return local_final_cards;
  }

  /*
    Esta función se encarga de clonar la carta, toma como parametro:

    la cantidad de cartas q hay en el mazo, el maximo de cartas que puede haber de esetipo,
    el numero de veces q se debe clonar la carta, la estructura a la que se añadira el clonado y 
    la informacion de la carta a duplicar.

    Se revisa que se pueda añadir una carta y se hace un loop con la cantidad de veces
    a insertar.
  */

    //Ok, este método se vuelve no necesario xq depende de lo que esté en la API
    //y muchos campos den la API y la BD no están estandarizados.  -> Error de diseño!
  private autoCompleteCardDuplicationHelper = (current_card_count: number, card_max: number, card_number_to_duplicate: number,
    final_structure: Array<any>, card_to_duplicate: any): boolean => {
    let my_return = false;
    if (current_card_count < card_max) {
      let to_insert:CartaConsumible = {} as CartaConsumible;

      switch (card_to_duplicate[1]) {
        case "Arma":
          to_insert.tipo_heroe = card_to_duplicate[0].TipoHeroe;
          to_insert.nombre = card_to_duplicate[0].Nombre;
          to_insert.descripcion = card_to_duplicate[0].Desc;
          to_insert.coleccion = card_to_duplicate[1];
          to_insert.urlImagen = card_to_duplicate[0].UrlImagen;
          to_insert.efecto = card_to_duplicate[0].Efecto;
          to_insert.efecto_heroe = null;
          break;
        case "Armadura":
          to_insert.tipo_heroe = card_to_duplicate[0].Heroe;
          to_insert.nombre = card_to_duplicate[0].Tipo;
          to_insert.descripcion = card_to_duplicate[0].Desc;
          to_insert.coleccion = card_to_duplicate[1];
          to_insert.urlImagen = card_to_duplicate[0].UrlImagen;
          to_insert.efecto = card_to_duplicate[0].Efecto;
          to_insert.efecto_heroe = null;
          break;
        case "Item":
          to_insert.tipo_heroe = card_to_duplicate[0].Heroe;
          to_insert.nombre = card_to_duplicate[0].Nombre;
          to_insert.descripcion = card_to_duplicate[0].Desc;
          to_insert.coleccion = card_to_duplicate[1];
          to_insert.urlImagen = card_to_duplicate[0].UrlImagen;
          to_insert.efecto = card_to_duplicate[0].Efecto;
          to_insert.efecto_heroe = null;
          break;
        case "Epica":
          to_insert.tipo_heroe = card_to_duplicate[0].Heroe;
          to_insert.nombre = card_to_duplicate[0].Nombre;
          to_insert.descripcion = card_to_duplicate[0].Desc;
          to_insert.coleccion = card_to_duplicate[1];
          to_insert.urlImagen = card_to_duplicate[0].UrlImagen;
          to_insert.efecto = card_to_duplicate[0].EfectoGlobal;
          to_insert.efecto_heroe = card_to_duplicate[0].EfectoHeroe;
          break;
      }

      for (let i = 0; i < card_number_to_duplicate; i++) {
        final_structure.push(to_insert);
      }
      my_return = true;
    }
    return my_return;
  }
}