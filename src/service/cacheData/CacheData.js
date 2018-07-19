import HttpService from './../http/HttpService';

export default class CacheData {
    static getCategory = () =>{
        console.log('Metodo invocado');
        HttpService.make().get('/getGrid')
                   .then(success => {
                        localStorage.setItem('category', JSON.stringify(success.data));
                        console.log('Dados atualizado');
                   })
                   .catch(error => {
                       console.log('Erro ao carregar as categorias que estão salvas no banco');
                   })
    }
}