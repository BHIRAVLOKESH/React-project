# React-project
**React Internship Assignment**

This project is part of a React internship assignment.
The goal was to build a React application that shows artwork data from the Art Institute of Chicago API using a table with pagination and row selection.
The app is built using React + TypeScript + Vite and uses PrimeReact DataTable for rendering the table.

**Live Demo**
Netlify Link:
👉https://stalwart-melba-353927.netlify.app/

**Technologies Used**

React

TypeScript

Vite

PrimeReact

PrimeIcons

**API Used**

Art Institute of Chicago API:

https://api.artic.edu/api/v1/artworks?page=1

Data is fetched page by page.

No data is prefetched or stored for other pages.

**Table Columns**

The following fields are shown in the table:

Title

Place of Origin

Artist Display

Inscriptions

Date Start

Date End

**Features Implemented**

Pagination

Server-side pagination is used

API is called whenever the page changes

Only the current page data is stored

**Row Selection**

Rows can be selected using checkboxes

Select all works only for the current page

Rows can be deselected individually

**Persistent Selection**

Selected rows remain selected when switching pages

Only artwork IDs are stored to track selection

When a page is revisited, data is fetched again and selection is reapplied

No rows from other pages are fetched or stored

**Custom Row Selection**

An overlay panel allows selecting a custom number of rows

Selection is limited to rows available on the current page

If the number entered is greater than available rows, no additional pages are fetched

**Constraints Followed**

TypeScript is used (no JavaScript)

Vite is used (not Create React App)

No prefetching of pages

No storing full row objects

No multiple API calls for selection logic

**Running the Project Locally**

npm install

npm run dev
