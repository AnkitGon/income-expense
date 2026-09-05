import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\GoalController::reorder
 * @see app/Http/Controllers/GoalController.php:127
 * @route '/{current_team}/goals/reorder'
 */
export const reorder = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/{current_team}/goals/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GoalController::reorder
 * @see app/Http/Controllers/GoalController.php:127
 * @route '/{current_team}/goals/reorder'
 */
reorder.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { current_team: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                }

    return reorder.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::reorder
 * @see app/Http/Controllers/GoalController.php:127
 * @route '/{current_team}/goals/reorder'
 */
reorder.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GoalController::reorder
 * @see app/Http/Controllers/GoalController.php:127
 * @route '/{current_team}/goals/reorder'
 */
    const reorderForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GoalController::reorder
 * @see app/Http/Controllers/GoalController.php:127
 * @route '/{current_team}/goals/reorder'
 */
        reorderForm.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(args, options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
export const index = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{current_team}/goals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
index.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { current_team: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                }

    return index.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
index.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
index.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
    const indexForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
        indexForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoalController::index
 * @see app/Http/Controllers/GoalController.php:18
 * @route '/{current_team}/goals'
 */
        indexForm.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
export const create = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/{current_team}/goals/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
create.url = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                }

    return create.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
create.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
create.head = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
    const createForm = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
        createForm.get = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoalController::create
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/create'
 */
        createForm.head = (args: { current_team: string | number } | [current_team: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\GoalController::store
 * @see app/Http/Controllers/GoalController.php:55
 * @route '/{current_team}/goals'
 */
export const store = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{current_team}/goals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GoalController::store
 * @see app/Http/Controllers/GoalController.php:55
 * @route '/{current_team}/goals'
 */
store.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
            args = { current_team: args.slug }
        }
    
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                }

    return store.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::store
 * @see app/Http/Controllers/GoalController.php:55
 * @route '/{current_team}/goals'
 */
store.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GoalController::store
 * @see app/Http/Controllers/GoalController.php:55
 * @route '/{current_team}/goals'
 */
    const storeForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GoalController::store
 * @see app/Http/Controllers/GoalController.php:55
 * @route '/{current_team}/goals'
 */
        storeForm.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
export const show = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/{current_team}/goals/{goal}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
show.url = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    goal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                goal: args.goal,
                }

    return show.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{goal}', parsedArgs.goal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
show.get = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
show.head = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
    const showForm = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
        showForm.get = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoalController::show
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}'
 */
        showForm.head = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
export const edit = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/{current_team}/goals/{goal}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
edit.url = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    goal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: args.current_team,
                                goal: args.goal,
                }

    return edit.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{goal}', parsedArgs.goal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
edit.get = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
edit.head = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
    const editForm = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
        editForm.get = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GoalController::edit
 * @see app/Http/Controllers/GoalController.php:0
 * @route '/{current_team}/goals/{goal}/edit'
 */
        editForm.head = (args: { current_team: string | number, goal: string | number } | [current_team: string | number, goal: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
export const update = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/{current_team}/goals/{goal}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
update.url = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    goal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                goal: typeof args.goal === 'object'
                ? args.goal.id
                : args.goal,
                }

    return update.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{goal}', parsedArgs.goal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
update.put = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
update.patch = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
    const updateForm = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
        updateForm.put = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\GoalController::update
 * @see app/Http/Controllers/GoalController.php:79
 * @route '/{current_team}/goals/{goal}'
 */
        updateForm.patch = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\GoalController::destroy
 * @see app/Http/Controllers/GoalController.php:110
 * @route '/{current_team}/goals/{goal}'
 */
export const destroy = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{current_team}/goals/{goal}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\GoalController::destroy
 * @see app/Http/Controllers/GoalController.php:110
 * @route '/{current_team}/goals/{goal}'
 */
destroy.url = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    current_team: args[0],
                    goal: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        current_team: typeof args.current_team === 'object'
                ? args.current_team.slug
                : args.current_team,
                                goal: typeof args.goal === 'object'
                ? args.goal.id
                : args.goal,
                }

    return destroy.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{goal}', parsedArgs.goal.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GoalController::destroy
 * @see app/Http/Controllers/GoalController.php:110
 * @route '/{current_team}/goals/{goal}'
 */
destroy.delete = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\GoalController::destroy
 * @see app/Http/Controllers/GoalController.php:110
 * @route '/{current_team}/goals/{goal}'
 */
    const destroyForm = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GoalController::destroy
 * @see app/Http/Controllers/GoalController.php:110
 * @route '/{current_team}/goals/{goal}'
 */
        destroyForm.delete = (args: { current_team: string | { slug: string }, goal: string | number | { id: string | number } } | [current_team: string | { slug: string }, goal: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const GoalController = { reorder, index, create, store, show, edit, update, destroy }

export default GoalController