import RecordatorioLlenarDatos from "../RecordatorioLlenarDatos"
import EventosProximos from './EventosProximos';
import React from 'react'
import LandingView from './LandingView';
import PhoneDialog from '../PhoneDialog'

const Home = ({sessionData}) =>{
    return(
        <section>
            {(!sessionData.id)?
                <LandingView/>:
                (<div style={{padding: "40px 5%"}}>
                    <EventosProximos id={sessionData.id} title = {true} />
                    <PhoneDialog user={sessionData.id} />
                </div>
                )
            }
            <RecordatorioLlenarDatos/>
        </section>
    )
}
export default Home;