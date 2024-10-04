import { Container } from '@mantine/core';
import React from 'react';
import { Right } from './components/Right';
import { Left } from './components/Left';

export const PetFood = () => {
  return (
    <Container size={'xl'} className="flex w-full flex-1 gap-5 pb-[80px] pt-[100px]">
      <div className="w-[50%]">
        <Left />
      </div>
      <div className="w-[50%]">
        <Right />
      </div>
    </Container>
  );
};
