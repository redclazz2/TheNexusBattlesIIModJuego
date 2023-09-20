var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Carta from "./cartaClass.js";
import CartaHeroe from "./cartaHeroeClass.js";
export default class InventarioModel {
    constructor() { }
    getArmaCard(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://cards.thenexusbattles2.cloud/api/armas/' + e.id_carta);
                const card = yield response.json();
                const _current_card = new Carta();
                _current_card.id = card.Id;
                _current_card.nombre = card.Nombre;
                _current_card.desc = card.Desc;
                _current_card.coleccion = "Arma";
                _current_card.urlImagen = card.UrlImagen;
                return _current_card;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getArmaduraCard(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://cards.thenexusbattles2.cloud/api/armaduras/' + e.id_carta);
                const card = yield response.json();
                const _current_card = new Carta();
                _current_card.id = card.Id;
                _current_card.nombre = "Armadura " + card.Tipo;
                _current_card.coleccion = "Armadura";
                _current_card.desc = card.Desc;
                _current_card.urlImagen = card.UrlImagen;
                return _current_card;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getItemCard(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://cards.thenexusbattles2.cloud/api/items/' + e.id_carta);
                const card = yield response.json();
                const _current_card = new Carta();
                _current_card.id = card.Id;
                _current_card.nombre = card.Nombre;
                _current_card.desc = card.Desc;
                _current_card.coleccion = "Item";
                _current_card.urlImagen = card.UrlImagen;
                return _current_card;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getEpicaCard(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://cards.thenexusbattles2.cloud/api/epicas/' + e.id_carta);
                const card = yield response.json();
                const _current_card = new Carta();
                _current_card.id = card.Id;
                _current_card.nombre = card.Nombre;
                _current_card.desc = card.Desc;
                _current_card.coleccion = "Epica";
                _current_card.urlImagen = card.UrlImagen;
                return _current_card;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getHeroeCard(e) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://cards.thenexusbattles2.cloud/api/heroes/' + e.id_carta);
                const card = yield response.json();
                const _current_card = new CartaHeroe();
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
                return _current_card;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // En InventarioModel
    getUserInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            const _dataSource = "../cartas.json"; // Cambiar esta línea por la API
            try {
                //const userInventory = await fetch(_dataSource);
                //const cartasJSON = await userInventory.json();
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
                        "id": 7,
                        "user": "Administrador",
                        "id_carta": "64eb906091c55d02fe369b28",
                        "type": "Epica"
                    },
                    {
                        "id": 7,
                        "user": "Administrador",
                        "id_carta": "64eb906091c55d02fe369b28",
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
                ];
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
                const cartas = yield Promise.all(cartasPromises);
                return cartas;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
