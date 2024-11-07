import Dispacher from "./router/dispacher";
// import a from "./local/importer"
import k from "./db/sp.kurumi.imgs.json"
export default function App (){
    return <>
    <Dispacher/>
    <img src={k[0]} alt="" />
        
    </>
}

