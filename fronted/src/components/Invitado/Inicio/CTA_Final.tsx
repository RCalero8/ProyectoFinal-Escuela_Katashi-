import '../../../style/Invitado/Inicio/CTA_Final.css';

interface Valor {
    emoji: string;
    etiqueta: string;
}

const valores:Valor [] = [
    { emoji: '🥋', etiqueta: "Tradición"},
    { emoji: '💪', etiqueta: "Fuerza"},
    { emoji: '🧘', etiqueta: "Disciplina"},
    { emoji: '🏆', etiqueta: "Exito"},
];

export default function CTA_Final() {
    return (
        <div className="contenedor-principal">
            <div className="capa-oscura">
                <div className="contenido">
                    <h1 className="titulo-principal">¿Quieres iniciarte en el camino del karate?</h1>
                    <p className="subtitulo">Únete a nuestra comunidad y comienza tu transformación física y mental hoy mismo</p>
                    {/*Botone*/}
                    <div className='fila-botones'>
                        <button className="boton-registro">🧑 Registrarse</button>
                        <button className="boton-sesion">🏯 Inicio Sesion</button>
                    </div>
                    {/*Valores*/}
                    <div className="fila-valores">
                        {valores.map((v) => (
                            <div className="elemento-valor" key={v.etiqueta}>
                                <span className="emoji-valor">{v.emoji}</span>
                                <span className="texto-valor">{v.etiqueta}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}