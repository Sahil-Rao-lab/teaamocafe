// components/Slides.js

import React, { useEffect, useState } from 'react';
import { Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControlLabel } from '@mui/material';
import AdminPanelLayout from '@/components/AdminPanelLayout';
import axios from 'axios';
import styles from '../styles/AdminPanelLayout.module.css';
import ErrorMessage from '@/components/ErrorMessage';

const Slides = () => {
    const [slides, setSlides] = useState(null);
    const [isAddSlideFormOpen, setIsAddSlideFormOpen] = useState(false);
    const [newSlideInputs, setNewSlideInputs] = useState({
        slideTitle: '',
        slideDescription: '',
        slideLinkName: false,
        slideLinkURL: '',
        slideImage: null,
    });
    const [showError, setShowError] = useState(null);

    useEffect(() => {
        axios
            .get('/api/fetchSlide') // Use the relative path to your API route
            .then((res) => setSlides(res.data))
            .catch((err) => console.log(err));
    }, []);

    const openAddSlideForm = () => {
        setIsAddSlideFormOpen(true);
    };

    const closeAddSlideForm = () => {
        setNewSlideInputs({
            slideTitle: '',
            slideDescription: '',
            slideLinkName: false,
            slideLinkURL: '',
            slideImage: null,
        });
        setIsAddSlideFormOpen(false);
    };

    const handleFormChange = (event) => {
        const { name, value, type, checked, files } = event.target;

        setNewSlideInputs((prevInputs) => {
            if (type === 'checkbox') {
                return {
                    ...prevInputs,
                    [name]: checked,
                };
            }

            if (type === 'file') {
                const fileData = files[0];
                console.log("Selected file data:", fileData);

                return {
                    ...prevInputs,
                    [name]: fileData,
                };
            }

            return {
                ...prevInputs,
                [name]: value,
            };
        });
    };



    const handleAddSlideForm = async (event) => {
        event.preventDefault();

        // Create FormData object
        const formData = new FormData();

        // Append form fields to FormData
        formData.append('slideTitle', newSlideInputs.slideTitle);
        formData.append('slideDescription', newSlideInputs.slideDescription);
        formData.append('slideLinkURL', newSlideInputs.slideLinkURL);

        // Append file to FormData
        formData.append('slideImage', newSlideInputs.slideImage);

        // Define validation rules (e.g., slideTitle is mandatory)
        let error = null;
        if (!newSlideInputs.slideTitle) {
            error = 'Slide Title is required';
        } else if (!newSlideInputs.slideDescription) {
            error = 'Slide Description is required';
        } else if (!newSlideInputs.slideLinkURL) {
            error = 'Slide Link URL is required';
        }

        // If there are validation errors, display them and return
        if (error) {
            setShowError({
                title: 'Validation Error',
                description: error,
            });
            return;
        }

        try {
            // Make API call with FormData
            const response = await axios.post('/api/addSlide', formData);

            if (response.status === 201) {
                // Slide added successfully
                // You can update the local state or perform any other action
                // For example, refresh the slide data:
                // fetchData();
                // Clear the form inputs
                setNewSlideInputs({
                    slideTitle: '',
                    slideDescription: '',
                    slideLinkName: false,
                    slideLinkURL: '',
                    slideImage: null,
                });
                // Close the form
                setIsAddSlideFormOpen(false);
            }
        } catch (error) {
            console.error('Error adding slide:', error);
            setShowError({
                title: 'Error',
                description: 'Failed to add slide. Please try again later.',
            });
        }
    };


    return (
        <>
            <AdminPanelLayout>
                {/* SLIDES SECTION START HERE */}
                {slides && (
                    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px', padding: '1rem', marginBottom: '3rem' }}>
                        <Typography variant="body1">Current Slides:</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Link Name</TableCell>
                                        <TableCell>Link URL</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {slides.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {row.slideImage ? (
                                                    <img src={`data:image/jpeg;base64,${Buffer.from(row.slideImage).toString('base64')}`} alt="Slide Preview" style={{ width: '100px', height: 'auto' }} />
                                                ) : (
                                                    <span>No Image Available</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{row.slideTitle}</TableCell>
                                            <TableCell>{row.slideDescription}</TableCell>
                                            <TableCell>{row.slideLinkName ? 'Yes' : 'No'}</TableCell>
                                            <TableCell>{row.slideLinkURL}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary">
                                                    EDIT
                                                </Button>{' '}
                                                <Button variant="contained" color="secondary">
                                                    DELETE
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}

                <div className={styles.navigationComponents}>
                    <div className={styles.newMenuAddSection}>
                        {!isAddSlideFormOpen ? (
                            <>
                                <Typography variant="body1">Click on the "Add a Slide" button to add a new slide.</Typography>
                                <Button className={styles.addNavigation} onClick={openAddSlideForm}>
                                    ADD A SLIDE
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1">Add Slide</Typography>
                                <br />
                                <form onSubmit={handleAddSlideForm} className={styles.form}>
                                    <label htmlFor="slideTitle" className={styles.label}>
                                        Slide Title:
                                    </label>
                                    <TextField
                                        type="text"
                                        name="slideTitle"
                                        id="slideTitle"
                                        className={styles.input}
                                        value={newSlideInputs.slideTitle}
                                        onChange={handleFormChange}
                                    />

                                    <label htmlFor="slideDescription" className={styles.label}>
                                        Slide Description:
                                    </label>
                                    <TextField
                                        type="text"
                                        name="slideDescription"
                                        id="slideDescription"
                                        className={styles.input}
                                        value={newSlideInputs.slideDescription}
                                        onChange={handleFormChange}
                                    />

                                    <div className={styles.checkboxMain}>
                                        <FormControlLabel
                                            control={
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="slideImage"
                                                    id="slideImage"
                                                    className={styles.checkbox}
                                                    onChange={handleFormChange}
                                                />

                                            }
                                            label="Slide Image"
                                            className={styles.checkboxLabel}
                                        />
                                    </div>

                                    <label htmlFor="slideLinkURL" className={styles.label}>
                                        Slide Link URL:
                                    </label>
                                    <TextField
                                        type="text"
                                        name="slideLinkURL"
                                        id="slideLinkURL"
                                        className={styles.input}
                                        value={newSlideInputs.slideLinkURL}
                                        onChange={handleFormChange}
                                    />

                                    {showError && <ErrorMessage title={showError.title} message={showError.description} />}

                                    <div className={styles.addNavigationCTAs}>
                                        <Button className={styles.addNavigationCTASubmit} variant="contained" type="submit" color="primary">
                                            Submit
                                        </Button>
                                        <Button className={styles.addNavigationCTACancel} onClick={closeAddSlideForm}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </AdminPanelLayout>
            {/* SLIDES SECTION END HERE */}
        </>
    );
};

export default Slides;
