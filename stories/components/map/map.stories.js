import MapTemplate from '@components/map/map.twig';
import MapDocs from './map.docs.md?raw';
import MapSource from '@components/map/map.twig?raw';

export default {
  title: 'Components/Map',
  parameters: {
    componentSource: {
      code: MapSource,
      language: 'twig',
    },
    docs: {
      description: {
        component: MapDocs,
      },
    },
  },
  args: {},
  argTypes: {
    lat: {
      control: 'number',
      description: 'Latitude for the map center and marker',
      table: {
        type: { summary: 'number' },
      },
    },
    long: {
      control: 'number',
      description: 'Longitude for the map center and marker',
      table: {
        type: { summary: 'number' },
      },
    },
    zoom: {
      control: 'number',
      description: 'Zoom level of the map',
      table: {
        type: { summary: 'number' },
      },
    },
    marker_text: {
      control: 'text',
      description: 'Text to display in the marker popup',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: 'text',
      description: 'URL of the custom marker icon (SVG or other image format)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

const Template = (args) => MapTemplate(args);

export const Default = Template.bind({});
Default.args = {
  lat: 48.8584, // Ex: Latitude pour Paris
  long: 2.2945, // Ex: Longitude pour Paris
  zoom: 13,
  marker_text: 'Here is Paris!',
  icon: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', // Exemple: Icône Leaflet par défaut
};

export const SecondMap = Template.bind({});
SecondMap.args = {
  lat: 40.7128, // Ex: Latitude pour New York
  long: -74.006, // Ex: Longitude pour New York
  zoom: 13,
  marker_text: 'Here is New York!',
  icon: 'https://leafletjs.com/examples/custom-icons/leaf-red.png', // Exemple: Une autre icône
};
