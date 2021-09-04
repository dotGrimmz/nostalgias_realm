import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { send } from 'emailjs-com';
import { useForm, FormProvider } from 'react-hook-form';
import CustomTextField from 'CheckoutPage/CustomTextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSnackbar } from 'notistack';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const useStyles = makeStyles({
    facebookIcon: {
        width: '80%',
        height: 'auto',
        color: 'blue'
    },
    instagramIcon: {
        width: '80%',
        height: 'auto',
        color: 'white',
        borderRadius: '25px',
        background:
            "radial-gradient(ellipse at center," +
            "orange" +
            " 0," +
            "purple" +
            " 100%)",
    },
    sendEmailBtn : {
        background:
        "radial-gradient(ellipse at center," +
        "grey" +
        " 0," +
        "lightgrey" +
        " 100%)",
        marginTop: '5%'
    }

});



const ContactUsPage = () => {
    const methods = useForm();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    // const { register, formState: { errors } } = useForm();
    const { register } = useForm();
    const [loading, setLoading] = useState(false);
    const [completedEmail, setCompletedEmail] = useState(false);
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.down('sm'));

    const styles={
        container: {
            padding: '4%'
        },
        outterLayer: {
            height: mobileView ? 'auto' : '85vh'
        }
    }
    
    const handleFormSubmit = async (data) => {
        setLoading(true)
        try {
            send(
                'service_ylefr9r',
                'template_fh45lml',
                {
                    from_name: data.fullName,
                    to_name: "Nolan Jones",
                    message: data.message + "Phone number:" + data.phone,
                    reply_to: data.email,
                },
                'user_Au2qentxjS49KqrLzaEzn' 
            ). then(res => {
                if(res.status ===200)  {
                    setCompletedEmail(true)
                    enqueueSnackbar("Email Sent", { variant: 'Success' });
                }
            })
        } catch(err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
          
    }
    
    return (
        <div className="cd-section" id="pricing"  >
            <div id="pricing-1">
                <Grid container justify='center' style={styles.outterLayer}>
                    <Grid item xs={12} md={6} > 
                        <Grid container style={styles.container} >
                            { !completedEmail && <Grid item xs={12}>
                                <h2 className='title text-center'>Share your thoughts with us</h2>
                                <p className='text-center'>You can contact us with anything related to our Products. We'll get in touch with you as soon as possible</p>
                            </Grid> }
                            {  completedEmail && <h2 className='title text-center'>Seriously, Thanks! Your feedback is greatly apprechiated!</h2>}
                             { !completedEmail && <Grid item xs={12}>             
                           <FormProvider {...methods}>
                              <form onSubmit={methods.handleSubmit((data) => handleFormSubmit({ ...data}))}>
                                    <Grid container spacing={2}>
                                        <CustomTextField
                                        smLen={12}
                                        name='fullName'
                                        label='Enter your full name'
                                        required
                                        
                                        {...register("fullName" , { required: "This is required." }) }
                                        />
                                         <CustomTextField

                                         smLen={6}
                                        name='email'
                                        label='Email address'
                                        required
                                        
                                        {...register("email", { required: "This is required." })}
                                        />
                                         <CustomTextField

                                         smLen={6}
                                        name='phone'
                                        label='Enter your Phone Number'
                                        
                                        {...register("phone")}
                                        />
                                         <CustomTextField

                                         smLen={12}
                                        name='message'
                                        label='Enter your message'
                                        required
                                        
                                        {...register("message", { required: "This is required." })}
                                        />
                                        
                                    </Grid>
                                    <Grid item xs={12} align='center'>
                            <Button type='submit'  classes={{ root: classes.sendEmailBtn }}>
                                Contact Us
                            </Button>
                            {loading && <LinearProgress />}
                                </Grid>
                                  </form>
                            </FormProvider >           
                         </Grid> }
                        
                            
                        </Grid>
                    </Grid> 

                    <Grid item={6}>
                        <Grid container >
                            <Grid item xs={12} align='left'>
                            <IconButton disableRipple onClick={() => window.open("https://www.facebook.com/nostalgiasrealm", "_blank")} >
                                <FacebookIcon classes={{ root: classes.facebookIcon }} />
                            </IconButton>
                            <p className="text-left"><b>Check us out on Facebook</b></p>
                            </Grid> 
                            <Grid item xs={12} align='right'>
                            <IconButton disableRipple onClick={() => window.open("https://www.instagram.com/fantasy_senpai/", "_blank")}>
                                <InstagramIcon classes={{ root: classes.instagramIcon }} />
                            </IconButton>
                            <p className="text-right"><b>Check us out on Instagram</b></p>
                            </Grid> 
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ContactUsPage;