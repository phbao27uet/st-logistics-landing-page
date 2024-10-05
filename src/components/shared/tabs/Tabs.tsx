'use client';

import { useState } from 'react';
import { Tabs } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { tss } from '@/libs/utils/tss-style';

export interface IOptionTab {
  title: string;
  content: React.JSX.Element;
}

type PlacementType = 'left' | 'right' | 'top';

interface TabsCustomProps {
  placement?: PlacementType;
  options: IOptionTab[];
}

const sections = {
  left: {
    rightSection: <IconArrowRight size={20} />,
  },
  right: {
    leftSection: <IconArrowLeft size={20} />,
  },
  top: {
    rightSection: <IconArrowRight size={20} />,
  },
};

const TabsCustom = ({ placement = 'left', options }: TabsCustomProps) => {
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };
  const { classes } = useStyles({ placement });

  if (placement === 'top') {
    return (
      <Tabs
        value={value}
        onChange={setValue}
        variant="none"
        className="gap-5 rounded-[30px] bg-primary p-[30px]"
      >
        <Tabs.List className={classes.list_top}>
          {options.map((option, index) => (
            <Tabs.Tab
              value={String(index + 1)}
              ref={setControlRef(String(index + 1))}
              className={classes.tab}
              key={option.title}
              {...sections[placement]}
            >
              {option.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {options.map((option, index) =>
          value === String(index + 1) ? (
            <Tabs.Panel value={String(index + 1)} key={option.title}>
              {option.content}
            </Tabs.Panel>
          ) : null,
        )}
      </Tabs>
    );
  }

  return (
    <Tabs
      variant="none"
      value={value}
      onChange={setValue}
      orientation="vertical"
      placement={placement}
      className="gap-[30px] rounded-[30px] bg-white p-[30px]"
      styles={{
        list: {
          border: 'none',
        },
      }}
    >
      <Tabs.List className={classes.list}>
        {options.map((option, index) => (
          <Tabs.Tab
            value={String(index + 1)}
            ref={setControlRef(String(index + 1))}
            className={classes.tab}
            key={option.title}
            {...sections[placement]}
          >
            {option.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {options.map((option, index) =>
        value === String(index + 1) ? (
          <Tabs.Panel value={String(index + 1)} key={option.title}>
            {option.content}
          </Tabs.Panel>
        ) : null,
      )}
    </Tabs>
  );
};

export { TabsCustom };

const useStyles = tss.withParams<{ placement: PlacementType }>().create(({ placement }) => ({
  list: {
    position: 'relative',
    marginBottom: 'var(--mantine-spacing-md)',
    width: '100%',
    maxWidth: '350px',
    gap: '20px',
    border: '1px solid red',
  },

  list_top: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '49px',
  },

  tab: {
    zIndex: 1,
    fontWeight: 500,
    backgroundColor: placement === 'top' ? '#fff' : '#f7f8ff',
    borderRadius: '25px',
    transition: 'all 800ms ease',
    color: placement === 'top' ? '#455589' : '#54595f',
    padding: '30px 20px',
    fontSize: '16px',
    textAlign: 'start',
    textTransform: 'uppercase',

    '&[data-active]': {
      backgroundColor: placement === 'top' ? '#455589' : '#1b264a',
      boxShadow: '0px 0px 40px -13px rgba(0, 0, 0, 0.5)',
      color: placement === 'top' ? '#fff' : '#f7f8ff',
      transform: 'translateY(0px) !important',
    },

    '&:hover': {
      backgroundColor: placement === 'top' ? '#455589' : '#1b264a',
      boxShadow: '0px 0px 40px -13px rgba(0, 0, 0, 0.5)',
      color: placement === 'top' ? '#fff' : '#f7f8ff',
      transform: 'translateY(-5px)',
    },
  },
}));
