
//import React from 'react';
import PropTypes from "prop-types"

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600' } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}>
      {alerta.msg}
    </div>
  )
}

Alerta.propTypes = {
    alerta: PropTypes.shape({        
        msg: PropTypes.string,
        error: PropTypes.bool,
    }).isRequired
};

export default Alerta;
