import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const baseButtonClass = 'border';
const roundedClasses = {
  vertical: {
    none: '',
    small: 'first:rounded-t last:rounded-b',
    medium: 'first:rounded-t-md last:rounded-b-md',
    large: 'first:rounded-t-lg last:rounded-b-lg',
    full: 'first:rounded-t-full last:rounded-b-full',
  },
  horizontal: {
    none: '',
    small: 'first:rounded-l last:rounded-r',
    medium: 'first:rounded-l-md last:rounded-r-md',
    large: 'first:rounded-l-lg last:rounded-r-lg',
    full: 'first:rounded-l-full last:rounded-r-full',
  },
};

const borderClasses = {
  text: {
    vertical: 'border-t-0 border-l-0 border-r-0 last:border-b-0',
    horizontal: 'border-l-0 border-t-0 border-b-0 last:border-r-0',
  },
  outlined: {
    vertical: 'border border-b-0 last:border-b',
    horizontal: 'border border-r-0 last:border-r',
  },
  contained: {
    vertical: 'border-t-0 border-l-0 border-r-0 last:border-b-0',
    horizontal: 'border-l-0 border-t-0 border-b-0 last:border-r-0',
  },
};

const variantClasses = {
  text: {
    default: 'border-custom-aquaBright',
    primary: 'border-custom-blue',
    secondary: 'border-custom-violetPale',
    white: 'border-white',
  },
  outlined: {
    default: '',
    primary: '',
    secondary: '',
    white: '',
  },
  contained: {
    default: 'border-white',
    primary: 'border-white',
    secondary: 'border-white',
    white: 'border-black',
  },
};

const orientationClasses = {
  vertical: 'flex-col',
  horizontal: 'flex-row',
};

const baseDisplayClass = 'inline-flex';
const fullWidthDisplayClass = 'flex';

const ButtonGroup = ({
  children,
  className,
  disabled = false,
  fullWidth = false,
  color = 'default',
  orientation = 'horizontal',
  rounded = 'medium',
  size = 'medium',
  variant = 'outlined',
  ...other
}) => {
  const ref = useRef(null);

  const buttonClasses = classnames(
    baseButtonClass,
    borderClasses[variant] && borderClasses[variant][orientation],
    variantClasses[variant] && variantClasses[variant][color],
    roundedClasses[orientation] && roundedClasses[orientation][rounded]
  );

  return (
    <div
      role="group"
      className={classnames(
        className,
        orientationClasses[orientation],
        fullWidth ? fullWidthDisplayClass : baseDisplayClass
      )}
      ref={ref}
      {...other}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          className: classnames(buttonClasses, child.props.className),
          disabled: child.props.disabled || disabled,
          color: child.props.color || color,
          fullWidth,
          rounded: 'none',
          size: child.props.size || size,
          variant: child.props.variant || variant,
        });
      })}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  rounded: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'full']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
};

export default ButtonGroup;
