import {intiServer} from './app'

async function init(){
    const app = await intiServer();
    app.listen(8000, () => {
        console.log(`Server is statting at PORT: 8000`)
    })
}

init();