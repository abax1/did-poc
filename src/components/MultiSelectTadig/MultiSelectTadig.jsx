import * as React from "react";
import { Button, MenuItem, H5, Intent } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";

import * as Tadigs from "./tagids";
import "./MultiSelectTadig.css";
import { NETWORK_LIST } from "../../constants";

const VRSMultiSelect = MultiSelect.ofType();

const INTENTS = [
  Intent.NONE,
  Intent.PRIMARY,
  Intent.SUCCESS,
  Intent.DANGER,
  Intent.WARNING
];



const popoverProps = {
  boundary: "window",
  canEscapeKeyClose: true,
  exampleIndex: 0,
  hasBackdrop: false,
  inheritDarkTheme: true,
  modifiers: {
    arrow: { enabled: false },
    flip: { enabled: true },
    keepTogether: { enabled: true },
    preventOverflow: { enabled: true }
  },
  position: "auto",
  sliderValue: 5,
  usePortal: false
};

class MultiSelectTadig extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log("PROPS: ", props)

    this.state = {
      tadig: Tadigs.NETWORKS[0],
      allowCreate: false,
      createdItems: [],
      fill: false,
      films: [],
      hasInitialContent: false,
      intent: true,
      items: Tadigs.NETWORKS,
      openOnKeyDown: true,
      popoverMinimal: true,
      resetOnSelect: false,
      tagMinimal: true
    };
  }

  filmSelectProps = {
    itemPredicate: Tadigs.filterTadig
  };

  componentDidMount(){
    console.log("TADIG SELECT: ", this.props, this.state)
    if(this.props.prePopData){
      this.setState({films: [...this.props.prePopData]})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.prePopData !== this.props.prePopData) {
      console.log('prePopData state has changed.')
      if(this.props.prePopData){
        this.setState({films: [...this.props.prePopData]})
      }  
    }
  }

  render() {
    const {
      allowCreate,
      films,
      hasInitialContent,
      tagMinimal,
      popoverMinimal,
      ...flags
    } = this.state;
    const getTagProps = (_value, index) => ({
      intent: this.state.intent ? INTENTS[index % INTENTS.length] : Intent.NONE,
      minimal: tagMinimal
    });
    const initialContent = this.state.hasInitialContent ? (
      <MenuItem disabled={true} text={`${NETWORK_LIST.length} items loaded.`} />
    ) : (
      // explicit undefined (not null) for default behavior (show full list)
      undefined
    );
    const maybeCreateNewItemFromQuery = allowCreate
      ? Tadigs.createTadig
      : undefined;
    const maybeCreateNewItemRenderer = allowCreate
      ? Tadigs.renderCreateFilmOption
      : null;

    const clearButton =
      films.length > 0 ? (
        <Button icon="cross" minimal={true} onClick={this.handleClear} />
      ) : (
        undefined
      );

    return (
      <div className="operator-label">
        {this.props.label && <H5>{this.props.label}</H5>}
        <VRSMultiSelect
          {...this.filmSelectProps}
          {...flags}
          createNewItemFromQuery={maybeCreateNewItemFromQuery}
          createNewItemRenderer={maybeCreateNewItemRenderer}
          initialContent={initialContent}
          itemRenderer={this.renderFilm}
          itemsEqual={Tadigs.areFilmsEqual}
          // we may customize the default filmSelectProps.items by
          // adding newly created items to the list, so pass our own
          items={this.state.items}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleFilmSelect}
          onItemsPaste={this.handleFilmsPaste}
          popoverProps={{ minimal: popoverMinimal }}
          tagRenderer={this.renderTag}
          tagInputProps={{
            tagProps: getTagProps,
            onRemove: this.handleTagRemove,
            rightElement: clearButton
          }}
          selectedItems={this.state.films}
          popoverProps={{ ...popoverProps }}
        />
      </div>
    );
  }

  handleValueChange = tadig => {
    console.log(tadig);
    this.setState({ tadig: tadig });
    if (this.props.setTadig) {
      this.props.setTadig(tadig);
    }
  };

  renderTag = film => film.tadig;

  // NOTE: not using Films.itemRenderer here so we can set icons.
  renderFilm = (film, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isFilmSelected(film) ? "tick" : "blank"}
        key={film.rank}
        label={film.country_code.toString()}
        onClick={handleClick}
        text={`${film.rank}. ${film.tadig}`}
        shouldDismissPopover={false}
      />
    );
  };

  handleTagRemove = (_tag, index) => {
    this.deselectFilm(index);
  };

  getSelectedFilmIndex(film) {
    return this.state.films.indexOf(film);
  }

  isFilmSelected(film) {
    return this.getSelectedFilmIndex(film) !== -1;
  }

  selectFilm(film) {
    this.selectFilms([film]);
  }

  selectFilms(filmsToSelect) {
    const { createdItems, films, items } = this.state;
    const { setTadig } = this.props;

    let nextCreatedItems = createdItems.slice();
    let nextFilms = films.slice();
    let nextItems = items.slice();

    filmsToSelect.forEach(film => {
      const results = Tadigs.maybeAddCreatedFilmToArrays(
        nextItems,
        nextCreatedItems,
        film
      );
      nextItems = results.items;
      nextCreatedItems = results.createdItems;
      // Avoid re-creating an item that is already selected (the "Create
      // Item" option will be shown even if it matches an already selected
      // item).
      nextFilms = !Tadigs.arrayContainsFilm(nextFilms, film)
        ? [...nextFilms, film]
        : nextFilms;
    });

    this.setState({
      createdItems: nextCreatedItems,
      films: nextFilms,
      items: nextItems
    }, () => {
      setTadig(this.state.films)
    });
  }

  deselectFilm(index) {
    const { films } = this.state;
    const { setTadig } = this.props;

    const film = films[index];
    const {
      createdItems: nextCreatedItems,
      items: nextItems
    } = Tadigs.maybeDeleteCreatedFilmFromArrays(
      this.state.items,
      this.state.createdItems,
      film
    );

    // Delete the item if the user manually created it.
    this.setState({
      createdItems: nextCreatedItems,
      films: films.filter((_film, i) => i !== index),
      items: nextItems
    }, () => {
      setTadig(this.state.films)
    });
  }

  handleFilmSelect = film => {
    if (!this.isFilmSelected(film)) {
      this.selectFilm(film);
    } else {
      this.deselectFilm(this.getSelectedFilmIndex(film));
    }
  };

  handleFilmsPaste = films => {
    // On paste, don't bother with deselecting already selected values, just
    // add the new ones.
    this.selectFilms(films);
  };
 
  handleClear = () => this.setState({ films: [] });
}

export default MultiSelectTadig;
