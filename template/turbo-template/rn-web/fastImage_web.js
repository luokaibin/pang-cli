import {
  ImageBackground,
  View
} from 'react-native';
import Image from 'next/image'

import React from 'react';

function canUseWebP () {
  if (global.document) {
    const elem = global.document.createElement('canvas');

    if (elem.getContext && elem.getContext('2d')) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    // very old browser like IE 8, canvas not supported
    return false;
  } else return true
}

ImageBackground.resizeMode = {
  stretch: 'stretch',
  cover: 'cover',
  contain: 'contain'
}

export default function FastImage (props) {
  const _props = Object.assign({}, props)

  if (!_props.source &&  !_props.source.uri) {
    return (
       <View {..._props}>
          {_props.children}
       </View>
    )
  }

  try {
    if (!_props.source.uri && !canUseWebP() && _props?.source?.indexOf && _props?.source?.indexOf('webp') !== -1) {
      _props.source = '/assets/' + _props.source.split('.')[1] + '.png'
      console.log('fallback to use png ' + _props.source.split('.')[1] + '.png')
    }

    if (_props?.source?.uri && !canUseWebP() && _props?.source?.uri?.indexOf && _props?.source?.uri?.indexOf('webp') !== -1) {
      _props.source.uri = _props.source.uri.replace('webp', 'png')
      console.log('fallback to use png ' + _props.source.uri)
    }
  } catch (e) {
    console.log(e)
  }


  let imageStyle = {
  }
  if (_props?.style?.borderRadius) {
    imageStyle.borderRadius = _props?.style?.borderRadius
  }

  if (typeof _props?.style === 'number') {
    imageStyle = _props?.style
  }

  try {
    if (_props.children) {
      return <ImageBackground {..._props} imageStyle={imageStyle} />
    } else if (_props.source.uri || _props.source) {
      let str = ''
      Object.keys(_props.style).forEach((key) => {
        str = str + ' image_' + key + '_' + _props.style[key]
      })
      return <Image
          // placeholder="blur"
          src={typeof _props.source.uri !== 'undefined' ? _props.source.uri : _props.source}
          width={parseInt(_props.style.width)}
          height={parseInt(_props.style.height)}
          className={str}
          layout='fixed'
          alt={'kikitrade'}
          // blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMsKEirBwAEZQHHzkGZ+AAAAABJRU5ErkJggg=='}
        />
    }
  } catch (e) {
    console.log(e)
  }
}
