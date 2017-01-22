import React from 'react';
import { Link } from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import 'style/categories';

const tilesData = [
  {
    img: 'http://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg',
    category: 'v',
    title: 'Vocals',
  },
  {
    img: 'http://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg',
    category: 's',
    title: 'Social',
  },
  {
    img: 'http://htmlcolorcodes.com/assets/images/html-color-codes-color-tutorials-hero-00e10b1f.jpg',
    category: 'st',
    title: 'Shower Thoughts',
  }
];

const Categories = () => {
  return (
    <div className='categories-listing'>
      <GridList
        cellHeight={180}
      >
        <Subheader>Categories</Subheader>
        {tilesData.map((tile, i) => (
          <Link
            to={`/categories/${tile.category}`}
            key={i}
          >
            <GridTile
              className={`tile ${tile.category}`}
              title={tile.title}
            >
            </GridTile>
          </Link>
        ))}
      </GridList>
    </div>
  )
}

export default Categories;
