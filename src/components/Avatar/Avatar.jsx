import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './Avatar.scss';

class Avatar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showInitialsOverlay: false
    };
  }

  render = () => {
    const { className, link, name, onClick, shape, source } = this.props;
    const initialsOverlay = this.getInitialsOverlay(name);
    return (
      <button
        className={cx(
          className,
          style['chat-avatar'],
          style[`chat-avatar--${shape}`]
        )}
        onClick={onClick}
        type='button'
      >
        <a
          className={cx(style['chat-avatar__link'])}
          href={link}
        >
          <LazyImage
            className={cx(style['chat-avatar__image'])}
            label={name}
            loader={shape === 'square' ? 'avatarSquare' : 'avatarRound'}
            onError={this.showInitialsOverlay}
            onLoad={this.hideInitialsOverlay}
            onSuccess={this.hideInitialsOverlay}
            placeholder={shape}
            source={source}
          />
        </a>
        {initialsOverlay}
      </button>
    );
  };

  getInitialsOverlay = (name) => {
    const { showInitialsOverlay } = this.state;
    if (!showInitialsOverlay || !name) {
      return null;
    }
    const initials = this.getInitials(name);
    return <span className={cx(style['chat-avatar__initials'])}>{initials}</span>;
  };

  getInitials = (name) => {
    if (!name) {
      return null;
    }
    const names = name.split(' ', 3);
    if (names.length === 1) {
      return names[0].substring(0, 3).toUpperCase();
    }
    const initials = names.map((name) => name.substring(0, 1));
    return initials.join('').toUpperCase();
  };

  hideInitialsOverlay = () => this.setState({
    showInitialsOverlay: false
  });

  showInitialsOverlay = () => this.setState({
    showInitialsOverlay: true
  });

}

Avatar.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  shape: PropTypes.oneOf([
    'circle',
    'square'
  ]),
  source: PropTypes.string
};

Avatar.defaultProps = {
  className: null,
  link: null,
  onClick: null,
  shape: 'circle',
  source: null
};

export default Avatar;
