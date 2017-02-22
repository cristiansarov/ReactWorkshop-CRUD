import React, {Component} from 'react';
import {Field as ReduxField} from 'redux-form';
import {Link} from 'react-router';
import _ from 'lodash';
import {stringToObjectValue, setObjectDeepValue} from 'core/utils/helpers';
import classnames from 'classnames';
import moment from 'moment';
import {reduxForm} from 'redux-form';


export {reduxForm};


/**
 * The Generic Field
 * @description An Interface for Form Field
 */
export class Field extends Component {

    renderFieldGroup({input, type, label, placeholder, onClick, disabled, replaceValue, replaceChecked, autoFocus, meta: {touched, error}}) {

        input.placeholder = placeholder;
        input.className = 'form-control';
        input.onClick = onClick;
        input.disabled = disabled;
        input.value = typeof replaceValue != 'undefined' ? replaceValue : input.value;
        input.checked = typeof replaceChecked != 'undefined' ? replaceChecked : input.checked;
        input.autoFocus = autoFocus;

        return (
            <div className={classnames('form-group', `fg-name-${input.name}`, `fg-type-${type}`, {'fg-invalid': error, 'fg-touched': touched})}>
              { label && <label>{label}</label> }
              <div>
                  { renderField() }
                  { touched && error && <span className="alert alert-danger">{error}</span> }
              </div>
            </div>
        );

        function renderField() {
            const inputTypes = ['text', 'password', 'email', 'phone', 'hidden', 'radio', 'checkbox' ];
            type = type || inputTypes[0];
            if (inputTypes.includes(type)) return <input type={type} {...input} />; // for all fields in inputFields constant
            else if (type == 'display') return input.value;
            else if (type == 'textarea') return <textarea {...input} />;
        }

    }

    render() {
        return <ReduxField component={this.renderFieldGroup} {...this.props} />;
    }
}


/**
 * FORM SUBMIT BUTTON
 */
export class SubmitButton extends Component {
    render() {
        const props = {};
        if (this.props.disabled || this.props.loading) props.disabled = true;
        return (
            <button type="submit" className="btn btn-success" {...props}>
                { this.props.loading ? (
                  <span className="button-spinner"><i className="fa fa-spinner fa-spin"/></span>
                ) : (
                  <i className="fa fa-check" />
                ) }
                { this.props.children || 'Save' }
            </button>
        );
    }
}

/**
 * FORM DELETE BUTTON
 */

export class DeleteButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-default" onClick={this.props.onDelete}>
                { this.props.children }
            </button>
        )
    }
}


/**
 * FORM RESET BUTTON
 */
export class ResetButton extends Component {
    render() {
        return (
            <button type="button" className="btn btn-default" onClick={this.props.reset}>
                { this.props.children || 'Reset' }
            </button>
        );
    }
}

/**
 * FORM RETURN BUTTON
 */
export class ReturnButton extends Component {
  render() {
    return (
      <Link className="btn btn-default" to={this.props.route}>
        <i className="fa fa-arrow-left" />
        { this.props.children || 'Return' }
      </Link>
    );
  }
}


/**
 * VALIDATION FUNCTION
 * @description Returns validate function required for Redux Form
 * @param:config The configuration object for generating the rules
 */
export function Validate(config) {

    let fields = config.fields || config;
    let tabList = config.tabList || [];


    /**
     * VALIDATION RULES
     */
    let rules = {
        required: function (fieldValue) {
            return !fieldValue;
        },
        wysiwygRequired: function (fieldValue) {
            return !fieldValue || fieldValue == '<p><br></p>';
        },
        arrayRequired: function (fieldValue) {
            if (!fieldValue) return false;
            return fieldValue.some(arrayItem=>!arrayItem);
        },
        propsInArrayRequired: function (fieldValue) {
            if (!fieldValue) return false;
            return fieldValue.some(arrayItem=> {
                let arrayInvalid = true;
                _.forEach(arrayItem, propValue=> {
                    if (propValue) arrayInvalid = false;
                });
                return arrayInvalid;
            });
        },
        propsInArrayPropRequired: function (fieldValue, prop) {
            if (!fieldValue) return false;
            return fieldValue.some(arrayItem=> {
                let arrayInvalid = true;
                _.forEach(arrayItem[prop], propValue=> {
                    if (propValue) arrayInvalid = false;
                });
                return arrayInvalid;
            });
        },
        minLength: function (fieldValue, validationValue) {
            if (!fieldValue) return false;
            return fieldValue.length < validationValue;
        },
        maxLength: function (fieldValue, validationValue) {
            if (!fieldValue) return false;
            return fieldValue.length >= validationValue;
        },
        integer: function (fieldValue) {
            if (!fieldValue) return false;
            return typeof fieldValue != 'number';
        },
        //password: function() {
        //  if(!modelValue) return;
        //  var e1 = modelValue.primary;
        //  var e2 = modelValue.verification;
        //  var isValid = e2!=null && e1==e2;
        //  ngModel.$setValidity('passwordMatch', isValid);
        //},
        email: function (fieldValue) {
            if (!fieldValue) return false;
            let emailRegexp = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,20})$/;
            return !emailRegexp.test(fieldValue);
        },
        compareEndDateBiggerThanStartDate: function (fieldValue, validationValue, values) {
          const comparedFieldValue = stringToObjectValue(validationValue.field, values);
          if(!comparedFieldValue || !fieldValue) return true;
          let difference = moment(fieldValue).diff(moment(comparedFieldValue))
           if(difference>=0) return true;
             else return false;
        }
    };


    /**
     * Redux Form validate function returned
     */
    return function (values) {
        const errors = {};

        // validate field function
        let validateField = function (fieldName, validations) {
            let isInvalid, validationType;
            let validationKeys = Object.keys(validations);
            for (let x = 0; x < validationKeys.length; x++) {
                validationType = validationKeys[x];
                let validationValue = validations[validationType];
                if (rules[validationType]) {
                    let fieldValue = stringToObjectValue(fieldName, values);
                    isInvalid = rules[validationType](fieldValue, validationValue, values);
                    if (isInvalid) break;
                }
            }
            return isInvalid ? validationType : false;
        };

        // validate all fields
        _.forEach(fields, (validations, fieldName) => {
            let errorType = validateField(fieldName, validations)
            if (errorType) {
                const validationMessage = ['propsInArrayPropRequired'].includes(errorType) ? {_error: errorType} : errorType;
                setObjectDeepValue(errors, fieldName, validationMessage);
            }
        });

        // validate tabList
        tabList.forEach((tabFields, tabIndex) => {
            errors.tabList = errors.tabList || {};
            let isTabInvalid = false;
            tabFields.forEach(tabField => {
                if (validateField(tabField, fields[tabField])) {
                    isTabInvalid = true;
                }
            });
            errors.tabList[tabIndex] = isTabInvalid
        });

        return errors;
    }

}
