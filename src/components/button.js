import React from 'react';

function Button({ text, children, ...rest }) {
    return (
        <button {...rest}>
            {text || children}
        </button>
    );
}

export default Button;