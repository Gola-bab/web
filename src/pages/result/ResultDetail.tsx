import React from 'react';
import { styled } from '@mui/material';
import styles from '@/styles/ResultDetail.module.css';
import { Typography } from '@mui/material';
import type { RestaurantSatisfaction, Satisfaction } from '@/interfaces';

type Props = {
  satisfaction: RestaurantSatisfaction;
};

const ResultDetail = ({ satisfaction }: Props) => {
  const content: { name: string; satisfaction: Satisfaction }[] = [
    // {
    //   name: '짱 좋아요',
    //   satisfaction: 'verygood',
    // },
    {
      name: '좋아요',
      satisfaction: 'good',
    },
    {
      name: '싫어요',
      satisfaction: 'bad',
    },
    // {
    //   name: '짱 싫어요',
    //   satisfaction: 'verybad',
    // },
  ];

  if (!satisfaction) return <div>loading...</div>;
  return (
    <div className={styles.container}>
      <div className={styles.flexwrap}>
        {content.map((item) => (
          <div key={`satisfaction-${item.satisfaction}`} className={styles.category}>
            <div className={styles.category_title}>
              <div className={styles.flex}>
                <ColoredCircle satisfaction={item.satisfaction} />
                <Typography variant='body2' fontFamily={'Noto Sans KR'}>
                  {item.name}
                </Typography>
              </div>
              <Typography variant='body2' fontFamily={'Noto Sans KR'}>
                {satisfaction[item.satisfaction]?.length ?? 0}명
              </Typography>
            </div>
            {satisfaction[item.satisfaction]?.map((name, index) => (
              <Typography
                key={`satisfaction-user-${name}-${index}`}
                variant='caption'
                fontFamily={'Noto Sans KR'}
                fontSize={'10px'}
                paddingLeft={'15px'}
              >
                {name}
              </Typography>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultDetail;

const ColoredCircle = styled('div')<{ satisfaction: Satisfaction }>`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: rgb(var(${(props) => `--gola-${props.satisfaction}-rgb`}));
`;
