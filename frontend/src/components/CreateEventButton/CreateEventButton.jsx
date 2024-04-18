import React, { useState } from 'react';
import { Modal, Button, TextInput, Textarea, Group, Select } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates'; // Corrected import
import './CreateEventButton.module.css';
import { postEvent } from '../../utils/endpoints';

const CreateEventButton = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [eventData, setEventData] = useState({
    tags: '',
    title: '',
    category: '',
    description: '',
    start_time: new Date(),
    end_time: new Date(),
    location_id: '',
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  });

  const handleChange = (field, value) => {
    setEventData({ ...eventData, [field]: value });
  };

  // Helper function to generate time options
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push({ value, label: value });
      }
    }
    return options;
  };

  const handleSubmit = () => {
    const token = sessionStorage.getItem('token');
  
    // Correctly format the start_time and end_time
    const formattedEventData = {
      ...eventData,
      tags: eventData.tags.split(',').map(tag => tag.trim()), // Split tags by comma and trim whitespace  
      start_time: eventData.start_time.toISOString(), // Format the datetime as ISO string
      end_time: eventData.end_time.toISOString(),
    };
  
    console.log(formattedEventData);
    postEvent(formattedEventData, token);
    setModalOpened(false);  // Close modal after submission
  };
  

  return (
    <div style={{'paddingTop': '10px'}}>
      <Button onClick={() => setModalOpened(true)}>Create Event</Button>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Create a New Event"
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <TextInput
            label="Title"
            required
            value={eventData.title}
            onChange={(event) => handleChange('title', event.currentTarget.value)}
          />
          <TextInput
            label="Category"
            value={eventData.category}
            onChange={(event) => handleChange('category', event.currentTarget.value)}
          />
          <TextInput
            label="Tags"
            value={eventData.tags}
            onChange={(event) => handleChange('tags', event.currentTarget.value)}
          />
          <Textarea
            label="Description"
            required
            value={eventData.description}
            onChange={(event) => handleChange('description', event.currentTarget.value)}
          />
          <DatePicker
            className="custom-datepicker"
            label="Start Date"
            required
            value={eventData.start_time}
            onChange={(date) => handleChange('start_time', date)}
          />
          <Select
            label="Start Time"
            required
            data={generateTimeOptions()}
            value={eventData.start_time.toTimeString().substring(0, 5)}
            onChange={(time) => handleChange('start_time', new Date(new Date(eventData.start_time).setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))))}
          />
          <DatePicker
            label="End Date"
            required
            value={eventData.end_time}
            onChange={(date) => handleChange('end_time', date)}
          />
          <Select
            label="End Time"
            required
            data={generateTimeOptions()}
            value={eventData.end_time.toTimeString().substring(0, 5)}
            onChange={(time) => handleChange('end_time', new Date(new Date(eventData.end_time).setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]))))}
          />
          <TextInput
            label="Address"
            required
            value={eventData.location_id}
            onChange={(event) => handleChange('location_id', event.currentTarget.value)}
          />
          <TextInput
            label="Contact Name"
            required
            value={eventData.contact_name}
            onChange={(event) => handleChange('contact_name', event.currentTarget.value)}
          />
          <TextInput
            label="Contact Phone"
            required
            value={eventData.contact_phone}
            onChange={(event) => handleChange('contact_phone', event.currentTarget.value)}
          />
          <TextInput
            label="Contact Email"
            required
            type="email"
            value={eventData.contact_email}
            onChange={(event) => handleChange('contact_email', event.currentTarget.value)}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default CreateEventButton;
