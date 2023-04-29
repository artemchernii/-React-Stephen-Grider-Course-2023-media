/* eslint-disable react/prop-types */
import classnames from 'classnames';
import { GoSync } from 'react-icons/go';
function Button({
    loading,
    children,
    primary,
    secondary,
    success,
    danger,
    warning,
    outline,
    rounded,
    ...rest
}) {
    const classes = classnames(
        rest.className,
        'h-8',
        'flex items-center px-3 py-1.5 border',
        {
            'opacity-80': loading,
            'border-blue-500 bg-blue-500 text-white': primary,
            'border-gray-900 bg-gray-900 text-white': secondary,
            'border-green-500 bg-green-500 text-white': success,
            'border-yellow-400 bg-yellow-400 text-white': warning,
            'border-red-500 bg-red-500 text-white': danger,
            'rounded-full': rounded,
            'bg-white': outline,
            'text-blue-500': outline && primary,
            'text-gray-900': outline && secondary,
            'text-green-500': outline && success,
            'text-yellow-400': outline && warning,
            'text-red-500': outline && danger,
        }
    );
    return (
        <button disabled={loading} {...rest} className={classes}>
            {loading ? <GoSync className="animate-spin" /> : children}
        </button>
    );
}

Button.propTypes = {
    checkVariationValue: ({ primary, secondary, success, danger, warning }) => {
        const count =
            Number(!!primary) +
            Number(!!secondary) +
            Number(!!success) +
            Number(!!danger) +
            Number(!!warning);

        if (count > 1) {
            return new Error(
                'Only one of primary, secondary, success, danger, warning can be used'
            );
        }
    },
};

export default Button;
