if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/mac/.gradle/caches/8.8/transforms/515a483ddc10df7764635ab8f497d657/transformed/hermes-android-0.75.4-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/mac/.gradle/caches/8.8/transforms/515a483ddc10df7764635ab8f497d657/transformed/hermes-android-0.75.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

