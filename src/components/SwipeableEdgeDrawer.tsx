import React from 'react';
import { useRouter } from 'next/router';
import { useInput, useDrawer, useSelectedButton } from '@/hooks';
import { GButton } from '@/layouts';
import TypoNotoSans from './TypoNotoSans';
import ButtonGroup from './ButtonGroup';
import Input from './Input';
import { createTeam } from '@/controller';
import { BusIcon, BikeIcon, FootPrintIcon } from '@/icons';
import styles from '@/styles/SwipeableEdgeDrawer.module.css';
import styled from '@emotion/styled';

type Props = {
  addressName: string;
  lat: number;
  lng: number;
};

const SwipeableEdgeDrawer = ({ addressName, lat, lng }: Props) => {
  const router = useRouter();
  const { value: name, handleChange: handleNameChange } = useInput('');
  const { value: count, handleChange: handleCountChange } = useInput(10);
  const { drawerRef, open } = useDrawer();
  const { selectedButton, radius, guideMessage, onClickButton } = useSelectedButton();

  const onClick = () => {
    createTeam({ name, lat, lng, radius })
      .then(({ teamId }) => {
        router.push({
          pathname: `gola/${teamId}`,
        });
      })
      .catch(() => {
        router.push({ pathname: '/404' });
      });
  };

  return (
    <StyledDrawer className={styles.container} ref={drawerRef} isOpen={open}>
      <div className={styles.puller} />
      <div className={styles.content}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <TypoNotoSans text='팀명' {...liTitleOptions} />
            <Input
              className={styles.list_item__content}
              placeholder='팀명을 입력하세요'
              value={name}
              onChange={handleNameChange}
              border={false}
            />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='기준 위치' {...liTitleOptions} />
            <TypoNotoSans text={addressName} className={styles.list_item__content} fontSize='0.8rem' textAlign='center' />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='음식점 개수' {...liTitleOptions} />
            <Input className={styles.list_item__content} type='number' value={count} onChange={handleCountChange} border={false} />
          </li>
          <li className={styles.list_item}>
            <TypoNotoSans text='제한 반경' {...liTitleOptions} />
            <div className={styles.list_item__content}>
              <ButtonGroup selectedButton={selectedButton} onClickButton={onClickButton}>
                <FootPrintIcon />
                <BikeIcon />
                <BusIcon />
              </ButtonGroup>
              <TypoNotoSans className={styles.list_item__button_guide} variant='caption' textAlign='center' fontSize='0.6rem'>
                {guideMessage}
              </TypoNotoSans>
            </div>
          </li>
        </ul>
        <GButton onClick={onClick} disabled={name === ''}>
          <TypoNotoSans text='완료' variant='button' textAlign='center' />
        </GButton>
      </div>
    </StyledDrawer>
  );
};

export default SwipeableEdgeDrawer;

const StyledDrawer = styled.div<{ isOpen: boolean }>`
  height: ${(props) => (props.isOpen ? 'var(--drawer-maximun-height)' : 'var(--drawer-default-height)')};
`;

const liTitleOptions = {
  className: styles.list_item__title,
  textAlign: 'right' as const,
  fontWeight: 500,
};
