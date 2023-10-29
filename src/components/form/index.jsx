import { useState, useEffect } from 'react'
import * as styles from './index.module.css'

function MerchantForm() {
    const [paymentMethod, setPaymentMethod] = useState('bank')
    const [paymentIsValid, setPaymentIsValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [dob, setDob] = useState('');
    const [startDate, setStartDate] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardZip, setCardZip] = useState('');

    const [gender, setGender] = useState('');
    const [dependents, setDependents] = useState('');
    const [language, setLanguage] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [zipError, setZipError] = useState('');
    const [dobError, setDobError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [paymentError, setPaymentError] = useState('');

    useEffect(() => {
        // First Name validation
        if (!firstName.trim()) {
            setFirstNameError('First Name is required');
        } else {
            setFirstNameError('');
        }

        // Last Name validation
        if (!lastName.trim()) {
            setLastNameError('Last Name is required');
        } else {
            setLastNameError('');
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailError('Email is required');
        } else if (!emailPattern.test(email)) {
            setEmailError('Enter a valid email');
        } else {
            setEmailError('');
        }

        // Address validation
        if (!address.trim()) {
            setAddressError('Address is required');
        } else {
            setAddressError('');
        }

        // City validation
        if (!city.trim()) {
            setCityError('City is required');
        } else {
            setCityError('');
        }

        // State validation
        const statePattern = /^(?:A[KLRZ]|C[AOT]|D[CE]|F[L]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$/;
        if (!state.trim()) {
            setStateError('State is required');
        } else if (!statePattern.test(state.toUpperCase())) {
            setStateError('Enter a valid state abbreviation');
        } else {
            setStateError('');
        }

        // Zip validation
        const zipPattern = /^\d{5}$/;
        if (!zip.trim()) {
            setZipError('ZIP code is required');
        } else if (!zipPattern.test(zip)) {
            setZipError('Enter a valid 5-digit ZIP code');
        } else {
            setZipError('');
        }

        // DOB validation
        if (!dob.trim()) {
            setDobError('DOB is required');
        } else {
            const currentDate = new Date();
            const dobDate = new Date(dob);
            const age = currentDate.getFullYear() - dobDate.getFullYear();

            if (dobDate > currentDate) {
                setDobError('DOB cannot be in the future');
            } else if (age < 18) {
                setDobError('You must be at least 18 years old');
            } else {
                setDobError('');
            }
        }

        // Start Date validation
        if (!startDate.trim()) {
            setStartDateError('Start Date is required');
        } else {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Reset hours to compare dates only
            const startDateDate = new Date(startDate);

            if (startDateDate < currentDate) {
                setStartDateError('Start Date cannot be in the past');
            } else {
                setStartDateError('');
            }
        }

        // Payment validation
        if (paymentMethod === 'bank') {
            if (accountNumber.trim() && routingNumber.trim()) {
                setPaymentError('');
                setPaymentIsValid(true);
            } else {
                setPaymentError('All bank details must be filled out');
                setPaymentIsValid(false);
            }
        } else if (paymentMethod === 'credit_card') {
            if (creditCardNumber.trim() && cardHolderName.trim() && expirationDate.trim() && cvv.trim() && cardZip.trim()) {
                setPaymentError('');
                setPaymentIsValid(true);
            } else {
                setPaymentError('All credit card details must be filled out');
                setPaymentIsValid(false);
            }
        }

        // Overall form validation
        if (firstName && lastName && email && address && city && state && zip && dob && startDate && paymentIsValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [firstName, lastName, email, address, city, state, zip, dob, startDate, accountNumber, routingNumber, creditCardNumber, cardHolderName, expirationDate, cvv, cardZip, paymentMethod, paymentIsValid]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            agent: '5555',
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            addressTwo: addressTwo,
            city: city,
            state: state,
            zip: zip,
            dob: dob,
            startDate: startDate,
            paymentMethod: paymentMethod,
            accountNumber: accountNumber,
            routingNumber: routingNumber,
            creditCardNumber: creditCardNumber,
            cardHolderName: cardHolderName,
            expirationDate: expirationDate,
            cvv: cvv,
            cardZip: cardZip,
            gender: gender,
            dependents: dependents,
            language: language
        };
        console.log(payload)
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({payload})}
        )
        .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok"),
              console.log("response not ok"),
              console.log(response)
            }
            return response.json()
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your submission, please try again:",
              error
            )
          })
        console.log('submitted')
      }

    return (
        <div className={styles.form + ' ' + styles.header__form}>
            <form>
                {/* First and last name */}
                <div className={styles.form__row}>
                    <div className={styles.form__cols}>
                        <div className={styles.form__col}>
                            <label htmlFor="first-name" className={styles.form__label}>
                                First Name<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="text" 
                                className={styles.field} 
                                id="first-name" 
                                placeholder="First Name" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {firstNameError && <span className={styles.error}>{firstNameError}</span>}
                        </div>
                        <div className={styles.form__col}>
                            <label htmlFor="last-name" className={styles.form__label}>
                                Last Name<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="text" 
                                className={styles.field} 
                                id="last-name" 
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} 
                            />
                            {lastNameError && <span className={styles.error}>{lastNameError}</span>}
                        </div>
                    </div>
                </div>
                {/* Email */}
                <div className={styles.form__row}>
                    <label htmlFor="email" className={styles.form__label}>
                        Email Address<span className={styles.form__asterisk}>*</span>
                    </label>
                    <input 
                        type="email" 
                        className={styles.field} 
                        id="email" 
                        placeholder="example@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
                    {emailError && <span className={styles.error}>{emailError}</span>}
                </div>
                {/* Address 1 */}
                <div className={styles.form__row}>
                    <label htmlFor="address" className={styles.form__label}>
                        Address<span className={styles.form__asterisk}>*</span>
                    </label>
                    <input 
                        type="text" 
                        className={styles.field} 
                        id="address" 
                        placeholder="555 Main St." 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {addressError && <span className={styles.error}>{addressError}</span>}
                </div>
                {/* Address 2 */}
                <div className={styles.form__row}>
                    <label htmlFor="addressTwo" className={styles.form__label}>
                        Address 2
                    </label>
                    <input 
                        type="text" 
                        className={styles.field} 
                        id="addressTwo" 
                        placeholder="Suite 5"
                        value={addressTwo}
                        onChange={(e) => setAddressTwo(e.target.value)}
                    />
                </div>
                {/* City, State */}
                <div className={styles.form__row}>
                    <div className={styles.form__cols}>
                        <div className={styles.form__col}>
                            <label htmlFor="city" className={styles.form__label}>
                                City<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="text" 
                                className={styles.field} 
                                id="city" 
                                placeholder="City" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {cityError && <span className={styles.error}>{cityError}</span>}
                        </div>
                        <div className={styles.form__col}>
                            <label htmlFor="state" className={styles.form__label}>
                                State<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="text" 
                                className={styles.field} 
                                id="state" 
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)} 
                            />
                            {stateError && <span className={styles.error}>{stateError}</span>}
                        </div>
                    </div>
                </div>
                {/* Zip, DOB */}
                <div className={styles.form__row}>
                    <div className={styles.form__cols}>
                        <div className={styles.form__col}>
                            <label htmlFor="zip" className={styles.form__label}>
                                Zip<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="number" 
                                className={styles.field} 
                                id="zip" 
                                placeholder="Zip Code"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)} 
                            />
                            {zipError && <span className={styles.error}>{zipError}</span>}
                        </div>
                        <div className={styles.form__col}>
                            <label htmlFor="dob" className={styles.form__label}>
                                Date of Birth<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="date" 
                                className={styles.field} 
                                id="dob" 
                                placeholder="Date of Birth" 
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                            />
                            {dobError && <span className={styles.error}>{dobError}</span>}
                        </div>
                    </div>
                </div>
                {/* Gender, Start date */}
                <div className={styles.form__row}>
                    <div className={styles.form__cols}>
                        <div className={styles.form__col}>
                            <label htmlFor="gender" className={styles.form__label}>
                                Gender
                            </label>
                            <select id='gender' className={styles.field} value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value='null'>Select</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                        <div className={styles.form__col}>
                            <label htmlFor="startDate" className={styles.form__label}>
                                Start Date<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="date" 
                                className={styles.field} 
                                id="startDate" 
                                placeholder="Start Date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            {startDateError && <span className={styles.error}>{startDateError}</span>}
                        </div>
                    </div>
                </div>
                {/* dependents, language */}
                <div className={styles.form__row}>
                    <div className={styles.form__cols}>
                        <div className={styles.form__col}>
                            <label htmlFor="dependents" className={styles.form__label}>
                                Additional Dependents
                            </label>
                            <select id='dependents' className={styles.field} value={dependents} onChange={(e) => setDependents(e.target.value)}>
                                <option value='null'>Select</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select>
                        </div>
                        <div className={styles.form__col}>
                            <label htmlFor="language" className={styles.form__label}>
                                Language
                            </label>
                            <select id='language' className={styles.field} value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option value='null'>Select</option>
                                <option value='english'>English</option>
                                <option value='spanish'>Spanish</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* payment */}
                <div className={styles.form__row}>
                    <label htmlFor="payment" className={styles.form__label}>
                        Payment Method<span className={styles.form__asterisk}>*</span>
                    </label>
                    <div className={styles.form__cols}>
                        <label className={styles.form__label__radio}>
                            <input
                                className={styles.form__radio}
                                type="radio"
                                value="bank"
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                            />
                            Bank Account
                        </label>
                        <label className={styles.form__label__radio}>
                            <input
                                className={styles.form__radio}
                                type="radio"
                                value="credit_card"
                                checked={paymentMethod === 'credit_card'}
                                onChange={() => setPaymentMethod('credit_card')}
                            />
                            Credit Card
                        </label>
                    </div>
                </div>
                {/* bank */}
                {paymentMethod === 'bank' && (
                    <>
                    <div className={styles.form__row}>
                        <label htmlFor="accountNumber" className={styles.form__label}>
                            Account Number<span className={styles.form__asterisk}>*</span>
                        </label>
                        <input 
                            type="text" 
                            inputMode='numeric' 
                            className={styles.field} 
                            id="accountNumber" 
                            placeholder="Account Number"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)} 
                        />
                    </div>
                    <div className={styles.form__row}>
                        <label htmlFor="routingNumber" className={styles.form__label}>
                            Routing Number<span className={styles.form__asterisk}>*</span>
                        </label>
                        <input 
                            type="text" 
                            inputMode='numeric' 
                            className={styles.field} 
                            id="routingNumber" 
                            placeholder="Routing Number" 
                            value={routingNumber}
                            onChange={(e) => setRoutingNumber(e.target.value)}
                        />
                    </div>
                    {paymentError && <span className={styles.error}>{paymentError}</span>}
                    </>
                )}
                {/* credit card */}
                {paymentMethod === 'credit_card' && (
                    <>
                    <div className={styles.form__row}>
                        <label htmlFor="creditCardNumber" className={styles.form__label}>
                            Credit Card Number
                        </label>
                        <input 
                            type="text" 
                            className={styles.field} 
                            id="creditCardNumber" 
                            placeholder="Credit Card Number"
                            value={creditCardNumber}
                            onChange={(e) => setCreditCardNumber(e.target.value)} 
                        />
                    </div>
                    <div className={styles.form__row}>
                        <label htmlFor="cardHolderName" className={styles.form__label}>
                            Cardholder Name
                        </label>
                        <input 
                            type="text" 
                            className={styles.field} 
                            id="cardHolderName" 
                            placeholder="Cardholder Name" 
                            value={cardHolderName}
                            onChange={(e) => setCardHolderName(e.target.value)}
                        />
                    </div>
                    <div className={styles.form__row}>
                    <div className={styles.form__cols}>
                        <div className={styles.form__col}>
                            <label htmlFor="expirationDate" className={styles.form__label}>
                                Experation Date<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="month" 
                                className={styles.field} 
                                id="expirationDate" 
                                placeholder="Experation Date" 
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                            
                        </div>
                        <div className={styles.form__col}>
                            <label htmlFor="cvv" className={styles.form__label}>
                                CVV<span className={styles.form__asterisk}>*</span>
                            </label>
                            <input 
                                type="text" 
                                className={styles.field} 
                                id="cvv" 
                                placeholder="CVV" 
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                maxLength="4"
                            />
                        </div>
                    </div>
                    </div>
                    <div className={styles.form__row}>
                        <div className={styles.form__cols}>
                            <div className={styles.form__col}>
                                <label htmlFor="cardZip" className={styles.form__label}>
                                    ZIP<span className={styles.form__asterisk}>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    className={styles.field} 
                                    id="cardZip" 
                                    placeholder="ZIP" 
                                    value={cardZip}
                                    onChange={(e) => setCardZip(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {paymentError && <span className={styles.error}>{paymentError}</span>}
                </>
                )}
                {/* Submit button */}
                <div className={styles.form__actions}>
                    <input 
                        type="submit" 
                        value="submit" 
                        className={`${formValid ? styles.btnValid : styles.btnInvalid} ${styles.btn}`} 
                        disabled={!formValid}
                        onClick={(e) => handleSubmit(e)}
                    />
                </div>
            </form>
        </div>
    )
}

export default MerchantForm
