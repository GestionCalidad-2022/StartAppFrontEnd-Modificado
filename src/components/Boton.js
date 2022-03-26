import React from 'react';
import PropTypes from 'prop-types'

const Boton = ({color, texto}) => {
    return (
        <button
            style={{ backfroundColor: color}}
            className='btn'
        >
            {texto}
        </button>
    )
}

Boton.propTypes = {
    texto: PropTypes.string,
    color: PropTypes.string,
}

export default Button