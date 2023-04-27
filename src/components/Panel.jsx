import PropTypes from 'prop-types';
import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
    const classes = classNames(className, 'border rounded shadow p-3 w-full');
    return (
        <div {...rest} className={classes}>
            {children}
        </div>
    );
}

Panel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    className: PropTypes.string,
};

export default Panel;
