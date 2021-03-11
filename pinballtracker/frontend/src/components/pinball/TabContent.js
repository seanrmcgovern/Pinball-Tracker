import React from 'react';
import PropTypes from 'prop-types';

const TabContent = (props) => {

    const { children, value, index } = props;

    return(
        <div>
            {value === index && (
                children
            )}
        </div>

    );
};

TabContent.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

export default TabContent;