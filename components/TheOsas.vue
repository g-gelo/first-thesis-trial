<template>
    <div>
        <div class="container">
            <v-img
                aspect-ratio="16/9"
                src="/img/osas-personnel.jpg"
                class="top-image"
            ></v-img>
        </div>
        <div>
            <v-card class="mt-4 rounded-xl rounded-be-xl" color="bg200">
                <div class="custom-text">
                    <v-list>
                        <span class="indent ma-3"
                            >As an institution of higher learning, the Cavite
                            State University caters to the needs of students,
                            not only in the acquisition of education but also in
                            their personality development. To ensure that the
                            students’ potentials for advancement are maximized,
                            the Student Welfare Services was established.</span
                        >
                    </v-list>
                </div>
            </v-card>
        </div>
        <div>
            <v-card
                title="Goal"
                class="mt-4 rounded-xl rounded-be-xl"
                color="bg200"
            >
                <div class="custom-text">
                    <v-list>
                        <span class="indent ma-3 mt-0"
                            >The goals of OSAS are to look after the
                            educational, vocational, as well as the personal
                            development needs of the students; to assist them to
                            maximize their potentials by helping them understand
                            themselves and their environment and to enhance
                            their psychological growth towards socialized
                            maturity.</span
                        >
                    </v-list>
                </div>
            </v-card>
        </div>
        <div>
            <v-card
                title="Functions"
                class="mt-4 rounded-xl rounded-be-xl"
                color="bg200"
            >
                <div class="custom-text">
                    <span class="indent ma-3 mt-0"
                        >To attain these goals, the OSAS performs the following
                        functions:</span
                    >
                    <v-list>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Provide counseling and testing to students so
                                that they may recognize and accept themselves
                                and develop their
                                potentials;</v-list-item-content
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Provide information, training, placement and
                                follow-up services to students, graduates and
                                other clienteles;</v-list-item-content
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Provide avenues to hone students’ talents and
                                interest to ensure social and cultural growth;
                                and</v-list-item-content
                            >
                        </v-list-item>
                        <v-list-item>
                            <v-icon size="2xs" class="mr-2"
                                >fa-regular fa-circle-dot</v-icon
                            >
                            <v-list-item-content
                                >Develop skills and potentials of student
                                writers.</v-list-item-content
                            >
                        </v-list-item>
                    </v-list>
                </div>
            </v-card>
        </div>
    </div>
</template>

<style scoped>
.top-image {
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(13, 202, 107, 0.3);
    opacity: 0.9;
    filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
}

.top-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.custom-text {
    text-align: justify;
    text-justify: inter-word;
}

.indent {
    display: inline-block;
    text-indent: 2em; /* Adjust the indentation value as needed */
}
</style>
