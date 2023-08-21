//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };
//   const submit1 = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//         setLoading(true);
//         await axios.post("https://ap-portfolio-backend.up.railway.app/auth/register", user);
//         navigate("/login");
//     }
    //  catch (err) {
    //     if (err instanceof Error) {
    //         toast.error(err.message)
    //     } else {
    //         toast.error("An error occurred.");
    //     }
    // }



            