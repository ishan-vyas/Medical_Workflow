import { process_params } from "express/lib/router";
import PatientItem from "./PatientItem";


function Patients(props){
    return <div>
        {props.items.map((item) => (
            <PatientItem 
                name={item.name}
                age={item.age}
            />
        ))}
    </div>
}

export default Patients;