// Code generated by go-swagger; DO NOT EDIT.

// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// GcpConfiguration gcp configuration
//
// swagger:model gcpConfiguration
type GcpConfiguration struct {

	// secretmanager
	// Required: true
	Secretmanager *GcpConfigurationSecretmanager `json:"secretmanager"`
}

// Validate validates this gcp configuration
func (m *GcpConfiguration) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateSecretmanager(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *GcpConfiguration) validateSecretmanager(formats strfmt.Registry) error {

	if err := validate.Required("secretmanager", "body", m.Secretmanager); err != nil {
		return err
	}

	if m.Secretmanager != nil {
		if err := m.Secretmanager.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("secretmanager")
			}
			return err
		}
	}

	return nil
}

// MarshalBinary interface implementation
func (m *GcpConfiguration) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GcpConfiguration) UnmarshalBinary(b []byte) error {
	var res GcpConfiguration
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// GcpConfigurationSecretmanager gcp configuration secretmanager
//
// swagger:model GcpConfigurationSecretmanager
type GcpConfigurationSecretmanager struct {

	// credentials
	Credentials *GcpConfigurationSecretmanagerCredentials `json:"credentials,omitempty"`

	// endpoint
	Endpoint string `json:"endpoint,omitempty"`

	// project id
	// Required: true
	ProjectID *string `json:"project_id"`
}

// Validate validates this gcp configuration secretmanager
func (m *GcpConfigurationSecretmanager) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateCredentials(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateProjectID(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *GcpConfigurationSecretmanager) validateCredentials(formats strfmt.Registry) error {

	if swag.IsZero(m.Credentials) { // not required
		return nil
	}

	if m.Credentials != nil {
		if err := m.Credentials.Validate(formats); err != nil {
			if ve, ok := err.(*errors.Validation); ok {
				return ve.ValidateName("secretmanager" + "." + "credentials")
			}
			return err
		}
	}

	return nil
}

func (m *GcpConfigurationSecretmanager) validateProjectID(formats strfmt.Registry) error {

	if err := validate.Required("secretmanager"+"."+"project_id", "body", m.ProjectID); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *GcpConfigurationSecretmanager) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GcpConfigurationSecretmanager) UnmarshalBinary(b []byte) error {
	var res GcpConfigurationSecretmanager
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}

// GcpConfigurationSecretmanagerCredentials gcp configuration secretmanager credentials
//
// swagger:model GcpConfigurationSecretmanagerCredentials
type GcpConfigurationSecretmanagerCredentials struct {

	// client email
	ClientEmail string `json:"client_email,omitempty"`

	// client id
	ClientID string `json:"client_id,omitempty"`

	// private key
	PrivateKey string `json:"private_key,omitempty"`

	// private key id
	PrivateKeyID string `json:"private_key_id,omitempty"`
}

// Validate validates this gcp configuration secretmanager credentials
func (m *GcpConfigurationSecretmanagerCredentials) Validate(formats strfmt.Registry) error {
	return nil
}

// MarshalBinary interface implementation
func (m *GcpConfigurationSecretmanagerCredentials) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *GcpConfigurationSecretmanagerCredentials) UnmarshalBinary(b []byte) error {
	var res GcpConfigurationSecretmanagerCredentials
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
