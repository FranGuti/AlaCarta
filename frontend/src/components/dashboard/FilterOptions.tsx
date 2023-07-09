import { useState } from 'react'
import React from 'react';
import { Tag } from './Tag';

const FilterOptions = ({ setFilterOption }: { setFilterOption: React.Dispatch<React.SetStateAction<string | undefined>> }) => {

    const [currentOption, setCurrentOption] = useState<string>("")

    const FilterOptions = [
        "Todas", "Hoy", "Esta Semana", "Este Mes", "Ultimos 6 Meses", "Este Año", "Personalizado"
    ]

    const handleOnClick = (option: string) => {
        setFilterOption(option)
        setCurrentOption(option)
    }

    return (
        <div className="ml-4 flex flex-col 2xl:gap-2 gap-1  justify-center ">
            {FilterOptions.map((option, index) => (
                <div key={index} className="cursor-pointer hover:scale-125 transition-all">
                    <div
                        onClick={() => handleOnClick(option)}
                        className={`h-fit 2xl:w-52 w-32  rounded-xl text-center ${currentOption === option ? 'bg-customRed scale-110' : 'bg-customDarkRed'
                            } px-4 hover:bg-customRed transition-all whitespace-nowrap text-xs 2xl:text-lg text-white font-bold`}>
                        {option}
                    </div>
                </div>
            ))}
        </div>

    )
}

const RangeDatePicker = ({ filterOption, customStartDate, customEndDate, setCustomStartDate, setCustomEndDate }: { filterOption: string | undefined, customStartDate: Date | undefined, customEndDate: Date | undefined, setCustomStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>, setCustomEndDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) => {


    const personalizedOption = filterOption === "Personalizado"

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateString = event.target.value;
        const selectedDateObject = selectedDateString ? new Date(selectedDateString) : undefined;
        setCustomStartDate(selectedDateObject);
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDateString = event.target.value;
        const selectedDateObject = selectedDateString ? new Date(selectedDateString) : undefined;
        setCustomEndDate(selectedDateObject);
    };

    return (
        <>
            {personalizedOption &&
                <div className="flex flex-col gap-3">

                    <div>
                        <Tag title={"Fecha de Inicio"} customComponents='bg-customRed mb-1  text-xs 2xl:text-lg' />
                        <input
                            type="date"
                            value={customStartDate ? customStartDate.toISOString().substr(0, 10) : ''}
                            onChange={handleStartDateChange}
                            className="border border-customRed font-bold bg-customBeige rounded-3xl px-1 py-1 focus:outline-none focus:ring-2 text-xs 2xl:text-lg focus:ring-customRed"
                        />
                    </div>
                    <div>
                        <Tag title={"Fecha de Fin"} customComponents='bg-customRed mb-1  text-xs 2xl:text-lg' />
                        <input
                            type="date"
                            value={customEndDate ? customEndDate.toISOString().substr(0, 10) : ''}
                            onChange={handleEndDateChange}
                            className="border border-customRed font-bold bg-customBeige rounded-3xl px-1 py-1 focus:outline-none text-xs 2xl:text-lg focus:ring-2 focus:ring-customRed"
                        />
                    </div>
                </div>}
        </>
    );
};

export { FilterOptions, RangeDatePicker };