import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

interface ValidationCPFProps {
    disabled: boolean;
    value?: string;
    validacao: boolean;
}

const ValidationCPF = ({ disabled, value, validacao }: ValidationCPFProps) => {
    const [cpf, setCPF] = useState(value || '');
    const [valid, setValid] = useState(validacao);

    const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const formattedCPF = formatCPF(value);
        setCPF(formattedCPF);
        setValid(validateCPF(value));
    };

    const formatCPF = (cpf: string) => {
        const cleanedCPF = cpf.replace(/[^\d]/g, '');
        const match = cleanedCPF.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return cleanedCPF;
    };

    const validateCPF = (cpf: string) => {
        const cleanedCPF = cpf.replace(/[^\d]/g, '');

        if (cleanedCPF.length !== 11) return false;

        const digits = cleanedCPF.split('').map(Number);

        // Verifica se todos os dígitos são iguais
        if (digits.every((digit) => digit === digits[0])) return false;

        // Cálculo do primeiro dígito verificador
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += digits[i] * (10 - i);
        }
        let firstDigit = 11 - (sum % 11);
        if (firstDigit > 9) firstDigit = 0;

        // Cálculo do segundo dígito verificador
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += digits[i] * (11 - i);
        }
        let secondDigit = 11 - (sum % 11);
        if (secondDigit > 9) secondDigit = 0;

        // Verifica se os dígitos verificadores são válidos
        return firstDigit === digits[9] && secondDigit === digits[10];
    };

    return (
        <div>
            <input
                type="text"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCPFChange}
                className={`form-control ${
                    valid  && cpf.length === 14 ? 'is-valid' : null
                } ${
                    !valid  && cpf.length === 14
                        ? 'is-invalid'
                        : null
                }`}
                maxLength={11}
                disabled={disabled}
            />
            {!valid && validacao && cpf.length === 14 ? (
                <span style={{ color: 'red' }}>
                    <Alert style={{ marginTop: '10px' }} variant="danger">
                        insira o CPF valido para que os dados fiquem corretos
                    </Alert>
                </span>
            ) : null}
        </div>
    );
};

export default ValidationCPF;
