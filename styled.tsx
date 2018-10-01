// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import * as React from 'react'
import { PropertyControls, ControlType, Frame } from 'framer'
import styled, { injectGlobal } from 'styled-components'

import '@material/card/dist/mdc.card.css'
import '@material/icon-button/dist/mdc.icon-button.css'
import '@material/typography/dist/mdc.typography.css'

injectGlobal`
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`

interface Props {
  imagePath?: string
  title?: string
  subtitle?: string
  body?: string
  action1: string
  action2: string
  icon1: string
  icon2: string
}

export class Card extends React.Component<Props> {
  static defaultProps = {
    width: 292,
    height: 216,
    imagePath: '',
    title: 'Our Changing Planet',
    subtitle: 'by Kurt Wagner',
    body:
      'Visit ten places on our planet that are undergoing the biggest changes today.',
    icon1: 'share',
    icon2: 'more_vert',
  }
  static propertyControls: PropertyControls = {
    imagePath: { type: ControlType.String, title: 'Image URL' },
    title: { type: ControlType.String, title: 'Title' },
    subtitle: { type: ControlType.String, title: 'Subtitle' },
    body: { type: ControlType.String, title: 'Body copy' },
    action1: { type: ControlType.String, title: 'Action one' },
    action2: { type: ControlType.String, title: 'Action two' },
    icon1: { type: ControlType.String, title: 'icon one' },
    icon2: { type: ControlType.String, title: 'icon two' },
  }

  render() {
    const {
      imagePath,
      title,
      subtitle,
      body,
      action1,
      action2,
      ...otherProps
    } = this.props
    return (
      <div className="mdc-card" style={{ width: '100%', height: '100a%' }}>
        {this.props.imagePath && (
          <div
            className="mdc-card__media mdc-card__media--16-9"
            style={{ backgroundImage: `url('${this.props.imagePath}')` }}
          />
        )}

        <CardContent>
          {this.props.title != '' && (
            <ContentPrimary>
              <Title className="mdc-typography--headline6">
                {this.props.title}
              </Title>

              <Subtitle className="mdc-typography--subtitle2">
                {this.props.subtitle}
              </Subtitle>
            </ContentPrimary>
          )}

          {this.props.body != '' && (
            <ContentSeconday>
              <Secondary className="mdc-typography--body2">
                Visit ten places on our planet that are undergoing the biggest
                changes today.
              </Secondary>
            </ContentSeconday>
          )}
        </CardContent>

        {this.props.action1 && (
          <div className="mdc-card__actions">
            <div className="mdc-card__action-buttons">
              {this.props.action1 && (
                <button className="mdc-button mdc-card__action mdc-card__action--button">
                  {this.props.action1}
                </button>
              )}

              {this.props.action2 && (
                <button className="mdc-button mdc-card__action mdc-card__action--button">
                  {this.props.action2}
                </button>
              )}
            </div>

            <div className="mdc-card__action-icons">
              {this.props.icon1 && (
                <button
                  className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
                  title="Share"
                >
                  share
                </button>
              )}
              {this.props.icon2 && (
                <button
                  className="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon"
                  title="More options"
                >
                  more_vert
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const CardContent = styled.div`
  padding: 0 1rem;
`

const ContentPrimary = styled.div`
  padding: 1rem 0;
`

const ContentSeconday = styled.div`
  padding-bottom: 8px;
`

const Title = styled.div``

const Subtitle = styled.div`
  color: rgba(0, 0, 0, 0.54);
`

const Secondary = styled.div`
  color: rgba(0, 0, 0, 0.54);
`
