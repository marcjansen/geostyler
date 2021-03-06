/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import * as React from 'react';
import { InputNumber, Form } from 'antd';
import { Data } from 'geostyler-data';

// default props
interface NumberFilterFieldDefaultProps {
  /** Label for this field */
  label: string;
  /** The default text to place into the empty field */
  placeholder: string;
  /** Initial value set to the field */
  value: number | undefined;
  /** Validation status */
  validateStatus: 'success' | 'warning' | 'error' | 'validating';
  /** Element to show a help text */
  help: React.ReactNode;
}
// non default props
export interface NumberFilterFieldProps extends Partial<NumberFilterFieldDefaultProps> {
  /** Reference to internal data object (holding schema and example features) */
  internalDataDef: Data;
  /** Callback for onChange */
  onValueChange: ((newValue: number) => void);
  /** The selected attribute name */
  selectedAttribute: string;
}
// state
interface NumberFilterFieldState {
  value: number | undefined;
}

/**
 * Input field for a numeric filter value.
 */
export class NumberFilterField extends React.Component<NumberFilterFieldProps, NumberFilterFieldState> {

  public static defaultProps: NumberFilterFieldDefaultProps = {
    label: 'Value',
    placeholder: 'Enter Numeric Value',
    value: undefined,
    validateStatus: 'success',
    help: 'Please enter a number.'
  };

  constructor(props: NumberFilterFieldProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  static getDerivedStateFromProps(
    nextProps: NumberFilterFieldProps,
    prevState: NumberFilterFieldState): Partial<NumberFilterFieldState> {
    return {
      value: nextProps.value
    };
  }

  /**
   * Stores the new value to the state object and
   * passes it to the passed in 'onValueChange' handler.
   */
  onChange = (e: number) => {
    this.setState({value: e});
    this.props.onValueChange(e);
  };

  render() {
    const {
      validateStatus,
      help,
      placeholder
    } = this.props;

    const helpTxt = validateStatus !== 'success' ? help : null;

    return (
      <div
        className="gs-text-filter-fld"
        draggable={true}
        onDragStart={(e) => e.preventDefault()}
      >
        <Form.Item
          label={this.props.label}
          colon={false}
          validateStatus={this.props.validateStatus}
          help={helpTxt}
          hasFeedback={true}
        >
          <InputNumber
            defaultValue={this.state.value}
            value={this.state.value}
            style={{
              width: '100%'
            }}
            onChange={this.onChange}
            placeholder={placeholder}
          />
        </Form.Item>
      </div>
    );
  }
}

export default NumberFilterField;
