import React, { CSSProperties } from 'react';
import { Dict, injectState, useModule } from '../../../../lib';

type TCard = {
  id: string,
  title: string,
  descr: string,
}

export class CardsModule {

  state = injectState({

    cards: generateCards(),

    selectedCardId: '',

    updateCard(patch: Partial<TCard>) {
      if (!this.selectedCardId) return;
      Object.assign(this.cards[this.selectedCardId], patch);
    },

    get size() {
      return Object.keys(this.cards).length;
    },

    get cardsList(): TCard[] {
      return Object.keys(this.cards).map(id => this.cards[id]);
    },

    get cardsIds(): string[] {
      return Object.keys(this.cards);
    },

    get selectedCard(): TCard| undefined {
      return this.cards[this.selectedCardId];
    },

  });
}

export function HighloadPage () {

  const { cardsIds, size, componentView } = useModule(CardsModule);

  console.log('render page', componentView);

  return (
    <>
      <h2>You have {size} cards</h2>

      <CardInput />

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cardsIds.map(id => <Card key={id} id={id} />)}
      </div>

    </>
  );
}

function Card(props: {id: string}) {

  // console.log('render card ', props.id);

  const {
    card,
    isSelected,
    setSelectedCardId,
  } = useModule(CardsModule).extend(cards => ({

    get card() {
      return cards.cards[props.id];
    },

    get isSelected() {
      return cards.selectedCardId === props.id;
    },

  }));

  return (
    <div
      className="ant-card ant-card-bordered"
      onClick={() => setSelectedCardId(card.id)}
      style={{ width: '200px', color: isSelected ? 'green' : 'inherit', cursor: 'pointer' }}
    >
      <div>{card.title}</div>
      <div>{card.descr}</div>
    </div>
  );
}

function CardInput() {

  const { selectedCard, updateCard } = useModule(CardsModule);

  return (
    <div>
      <input
        type="text"
        value={selectedCard?.title || ''}
        onChange={event => selectedCard && updateCard({ title: event.target.value })}
      />
    </div>
  );
}

function generateCards() {
  const cards: Dict<TCard> = {};
  for (let i = 0; i < 1000; i++) {
    const id = i.toString(10);
    cards[id] = { id, title: `Card ${id}`, descr: `Description ${id}` };
  }
  return cards;
}

function MyComponent() {

  // @ts-ignore
  const { onItemClick } = useModule(() => ({

    onItemClick() {
      alert('Click!');
    },

  }));

  return <button onClick={onItemClick}>Click me!</button>;
}
