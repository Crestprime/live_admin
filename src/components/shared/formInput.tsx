// import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import React from 'react';
// import { useField } from 'formik';

interface IProps {
    name: string;
    placeholder?: string;
    value?: any;
    label?: string;
    type?: React.HTMLInputTypeAttribute,
    isDisabled?: boolean,
    hasFrontIcon?: boolean;
    hasBackIcon?: boolean,
    icon?: React.ReactNode,
    iconback?: React.ReactNode
    setValue: (name: string, value: any) => void, 
    otherVaule?: any,
    errors: any,
    touched: any
}

export default function FormInput(
    {
        name,
        placeholder,
        value,
        label,
        type,
        isDisabled,
        hasFrontIcon,
        hasBackIcon,
        icon,
        iconback,
        setValue,
        otherVaule,
        errors,
        touched
    }: IProps) {

    const changeHandler = (item: string) => {
        if(type === "number") {
            setValue(name, Number(item))
        } else {
            setValue(name, item)
        }
    } 
    

    return (
        <div className=' w-full flex gap-2 flex-col ' >
            <p className=" font-medium text-sm " >{label}</p>
            <div className=' flex flex-col gap-1 ' >
                <div className=' relative h-[39px] ' >
                    {hasFrontIcon && (
                        <div className=' w-fit flex h-[39px] absolute top-0 left-0 justify-center items-center px-2 ' >
                            {icon}
                        </div>
                    )}
                    {hasBackIcon && (
                        <div className=' w-fit flex h-[39px] absolute top-0 right-0 justify-center items-center px-2 ' >
                            {iconback}
                        </div>
                    )}
                    <Input
                        type={type ?? "text"}
                        value={otherVaule ? otherVaule : (value[name]+"" === "0" || value[name]+"" === null) ? "" : value[name]}
                        onChange={(e)=> changeHandler(e.target.value)}
                        className={` ${hasFrontIcon ? " pl-12 " : ""} `}
                        placeholder={placeholder}
                        disabled={isDisabled}
                    />
                </div>

                {(touched[name] && errors[name]) && <div className=' text-sm text-error600 font-OpenRunde-Medium ' >{errors[name]}</div>} 
            </div>
        </div>
    )
}
