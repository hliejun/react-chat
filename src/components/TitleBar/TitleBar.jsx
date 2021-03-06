import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames/dedupe';

import { AppContext } from '../App/Context.jsx';
import Avatar from '../Avatar/Avatar.jsx';
import LazyImage from '../LazyImage/LazyImage.jsx';

import style from './titlebar.scss';

// TODO: Allow children buttons

class TitleBar extends React.Component {

  /* Lifecycle */

  render = () => {
    const { avatar, className, id, subtitle, title, label } = this.props;
    const { onInfo, onReturn } = this.props;
    return (
      <AppContext.Consumer>
        {(context) => (
          <div
            className={cx(
              'react-chat__title-bar',
              `react-chat__title-bar--${context.theme}`,
              className,
              style['chat-title-bar']
            )}
            ref={(element) => this.self = element}
          >
            {this.getBackButton(onReturn, id)}
            {this.getHeading(title, subtitle)}
            {this.getInfoButton(avatar, title, onInfo, id, label)}
          </div>
        )}
      </AppContext.Consumer>
    );
  };

  /* Subviews */

  getBackButton = (onReturn, id) => (
    <button
      className={cx(
        'react-chat__title-bar-button',
        style['chat-title-bar__back-button']
      )}
      onClick={onReturn && onReturn.bind(null, id)}
      disabled={!onReturn}
    >
      {onReturn && (
        <LazyImage
          label='back'
          loader='icon'
          placeholder='back'
        />
      )}
    </button>
  );

  getHeading = (title, subtitle) => (
    <div className={cx(
      'react-chat__title-bar-heading',
      style['chat-title-bar__heading']
    )}>
      <span className={cx(
        'react-chat__title-bar-title',
        style['chat-title-bar__title']
      )}>
        {title}
      </span>
      {subtitle && (
        <span className={cx(
          'react-chat__title-bar-subtitle',
          style['chat-title-bar__subtitle']
        )}>
          {subtitle}
        </span>
      )}
    </div>
  );

  getInfoButton = (avatar, title, onInfo, id, label) => (
    <Avatar
      className={cx(
        'react-chat__title-bar-avatar',
        style['chat-title-bar__avatar-button']
      )}
      name={label || title}
      onClick={onInfo && onInfo.bind(null, id)}
      source={avatar}
    />
  );

  /* Ref Accessors */

  getHeight = () => this.self && this.self.getBoundingClientRect ? this.self.getBoundingClientRect().height : 0;

}

TitleBar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onInfo: PropTypes.func,
  onReturn: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

TitleBar.defaultProps = {
  avatar: null,
  className: null,
  id: null,
  label: null,
  onInfo: null,
  onReturn: null,
  subtitle: null,
  title: 'Messages'
};

export default TitleBar;
